package com.pyAcademy.pyAcademy.features.auth.domain.service;

import com.pyAcademy.pyAcademy.features.auth.application.service.CloudinaryService;
import com.pyAcademy.pyAcademy.features.auth.domain.enums.RoleEnum;
import com.pyAcademy.pyAcademy.features.auth.domain.models.RoleEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.IRoleRepository;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.IUserRepository;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthCreateUserRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthLoginRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.response.AuthResponse;
import com.pyAcademy.pyAcademy.core.utils.JwtUtils;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private IUserRepository userRepository;
    @Autowired private IRoleRepository roleRepository;
    @Autowired private CloudinaryService cloudinaryService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserEntity userEntity = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + email + " no existe."));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        userEntity.getRoles().forEach(role ->
                authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));
        userEntity.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getName())));

        return new User(userEntity.getUsername(), userEntity.getPassword(), userEntity.isEnabled(),
                userEntity.isAccountNonExpired(), userEntity.isCredentialsNonExpired(), userEntity.isAccountNonLocked(), authorityList);
    }

    public AuthResponse createUser(AuthCreateUserRequest req) {
        String photoUrl = uploadPhotoIfPresent(req.photo());
        Set<RoleEntity> roles = getValidRoles(req.roleRequest().roleListName());

        UserEntity user;

        // Construcción especializada según tipo
        if (roles.stream().anyMatch(r -> r.getRoleEnum() == RoleEnum.ESTUDIANTE) && req.studentData() != null) {
            StudentEntity student = new StudentEntity();
            fillUserData(student, req, photoUrl, roles);
            student.setEnrollmentNumber(req.studentData().enrollmentNumber());
            student.setAcademicProgram(req.studentData().academicProgram());
            student.setSemester(req.studentData().semester());
            user = student;
        } else if (roles.stream().anyMatch(r -> r.getRoleEnum() == RoleEnum.MAESTRO) && req.teacherData() != null) {
            TeacherEntity teacher = new TeacherEntity();
            fillUserData(teacher, req, photoUrl, roles);
            teacher.setDepartment(req.teacherData().department());
            teacher.setSpecialization(req.teacherData().specialization());
            teacher.setAcademicDegree(req.teacherData().academicDegree());
            user = teacher;
        } else {
            user = new UserEntity();
            fillUserData(user, req, photoUrl, roles);
        }

        UserEntity savedUser = userRepository.save(user);
        List<SimpleGrantedAuthority> authorities = buildAuthorities(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser, null, authorities);
        String token = jwtUtils.createToken(authentication);

        return new AuthResponse(savedUser.getUsername(), savedUser.getId(), "User created successfully", token, true, savedUser.getPhoto());
    }

    private void fillUserData(UserEntity entity, AuthCreateUserRequest req, String photoUrl, Set<RoleEntity> roles) {
        entity.setUsername(req.username());
        entity.setPassword(passwordEncoder.encode(req.password()));
        entity.setEmail(req.email());
        entity.setTelefono(Long.valueOf(req.telefono()));
        entity.setFirstName(req.nombre());
        entity.setLastName(req.apellido());
        entity.setPhoto(photoUrl);
        entity.setRoles(roles);
        entity.setEnabled(true);
        entity.setAccountNonLocked(true);
        entity.setAccountNonExpired(true);
        entity.setCredentialsNonExpired(true);
    }

    private String uploadPhotoIfPresent(MultipartFile photo) {
        if (photo != null && !photo.isEmpty()) {
            try {
                return cloudinaryService.uploadFile(photo);
            } catch (IOException e) {
                throw new RuntimeException("Error al subir la foto: " + e.getMessage());
            }
        }
        return null;
    }

    private Set<RoleEntity> getValidRoles(List<String> rolesRequest) {
        List<RoleEnum> roleEnums = rolesRequest.stream()
                .map(role -> {
                    try {
                        return RoleEnum.valueOf(role.toUpperCase());
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role name: " + role);
                    }
                }).collect(Collectors.toList());

        Set<RoleEntity> roleEntities = new HashSet<>(roleRepository.findRoleEntitiesByRoleEnumIn(roleEnums));
        if (roleEntities.isEmpty()) throw new IllegalArgumentException("The roles specified do not exist.");
        return roleEntities;
    }

    private List<SimpleGrantedAuthority> buildAuthorities(UserEntity user) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->
                authorities.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));
        user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission.getName())));
        return authorities;
    }

    public AuthResponse loginUser(AuthLoginRequest loginRequest) {
        String email = loginRequest.email();
        String password = loginRequest.password();

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserEntity user = userRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario con email " + email + " no existe."));

        return new AuthResponse(user.getUsername(),  user.getId(),  "User logged in successfully", jwtUtils.createToken(authentication), true, user.getPhoto());
    }

    public Authentication authenticate(String email, String password) {
        UserDetails userDetails = loadUserByUsername(email);

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }

        return new UsernamePasswordAuthenticationToken(email, password, userDetails.getAuthorities());
    }
}