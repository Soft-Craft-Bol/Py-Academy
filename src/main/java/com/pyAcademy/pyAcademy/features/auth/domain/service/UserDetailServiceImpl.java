package com.pyAcademy.pyAcademy.features.auth.domain.service;

import com.pyAcademy.pyAcademy.features.auth.application.service.CloudinaryService;
import com.pyAcademy.pyAcademy.features.auth.domain.enums.RoleEnum;
import com.pyAcademy.pyAcademy.features.auth.domain.models.RoleEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.abstraction.IRoleRepository;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.abstraction.IUserRepository;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthCreateUserRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthLoginRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.response.AuthResponse;
import com.pyAcademy.pyAcademy.core.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserEntity userEntity = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + email + " no existe."));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        userEntity.getRoles().forEach(role ->
                authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name())))
        );

        userEntity.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .forEach(permission ->
                        authorityList.add(new SimpleGrantedAuthority(permission.getName()))
                );

        return new User(
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.isEnabled(),
                userEntity.isAccountNonExpired(),
                userEntity.isCredentialsNonExpired(),
                userEntity.isAccountNonLocked(),
                authorityList
        );
    }


    public AuthResponse createUser(AuthCreateUserRequest createRoleRequest) {
        String username = createRoleRequest.username();
        String password = createRoleRequest.password();
        String email = createRoleRequest.email();
        Long telefono = Long.valueOf(createRoleRequest.telefono());
        List<String> rolesRequest = createRoleRequest.roleRequest().roleListName();
        String photoUrl = null;


        // Subir la foto a Cloudinary si existe
        if (createRoleRequest.photo() != null && !createRoleRequest.photo().isEmpty()) {
            try {
                photoUrl = cloudinaryService.uploadFile(createRoleRequest.photo());
            } catch (IOException e) {
                // Manejar el error adecuadamente
                throw new RuntimeException("Error al subir la foto: " + e.getMessage());
            }
        }

        List<RoleEnum> roleEnums = rolesRequest.stream()
                .map(role -> {
                    try {
                        return RoleEnum.valueOf(role.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role name: " + role);
                    }
                })
                .collect(Collectors.toList());

        // Obtener los roles desde la base de datos
        Set<RoleEntity> roleEntityList = new HashSet<>(roleRepository.findRoleEntitiesByRoleEnumIn(roleEnums));

        if (roleEntityList.isEmpty()) {
            throw new IllegalArgumentException("The roles specified do not exist.");
        }


        UserEntity userEntity = UserEntity.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .telefono(telefono)
                .firstName(createRoleRequest.nombre())
                .lastName(createRoleRequest.apellido())
                .photo(photoUrl)
                .roles(roleEntityList)
                .enabled(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .build();

        UserEntity userSaved = userRepository.save(userEntity);

        ArrayList<SimpleGrantedAuthority> authorities = new ArrayList<>();

        userSaved.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));
        userSaved.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission.getName())));

        SecurityContext securityContextHolder = SecurityContextHolder.getContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(userSaved, null, authorities);

        String accessToken = jwtUtils.createToken(authentication);
        String photo = userSaved.getPhoto();

        return new AuthResponse(username, "User created successfully", accessToken, true, photo);
    }


    public AuthResponse loginUser(AuthLoginRequest authLoginRequest) {
        String email = authLoginRequest.email(); // Cambia de username a email
        String password = authLoginRequest.password();

        Authentication authentication = this.authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.createToken(authentication);

        UserEntity userEntity = userRepository.findUserEntityByEmail(email) // Cambia a búsqueda por email
                .orElseThrow(() -> new UsernameNotFoundException("El usuario con email " + email + " no existe."));
        String photo = userEntity.getPhoto();

        return new AuthResponse(userEntity.getUsername(), "User logged in successfully", accessToken, true, photo);
    }

    public Authentication authenticate(String email, String password) { // Cambia parámetro a email
        UserDetails userDetails = this.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException(String.format("Invalid email or password"));
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }

        return new UsernamePasswordAuthenticationToken(email, password, userDetails.getAuthorities());
    }


}
