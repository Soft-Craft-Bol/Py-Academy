package com.pyAcademy.pyAcademy.features.auth.infrastructure.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pyAcademy.pyAcademy.features.auth.domain.service.UserDetailServiceImpl;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthCreateRoleRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthCreateUserRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthLoginRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.response.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @PostMapping(value = "/sign-up", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuthResponse> register(
            @RequestPart("username") String username,
            @RequestPart("password") String password,
            @RequestPart("email") String email,
            @RequestPart("telefono") String telefono,
            @RequestPart("nombre") String nombre,
            @RequestPart("apellido") String apellido,
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            @RequestPart("roleRequest") String roleRequestJson) {

        try {
            // Convertir JSON a objeto
            AuthCreateRoleRequest roleRequest = new ObjectMapper()
                    .readValue(roleRequestJson, AuthCreateRoleRequest.class);

            // Crear el request
            AuthCreateUserRequest userRequest = new AuthCreateUserRequest(
                    username,
                    password,
                    email,
                    telefono,
                    nombre,
                    apellido,
                    photo,
                    roleRequest
            );

            return new ResponseEntity<>(
                    userDetailService.createUser(userRequest),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest userRequest){
        return new ResponseEntity<>(this.userDetailService.loginUser(userRequest), HttpStatus.OK);
    }
}