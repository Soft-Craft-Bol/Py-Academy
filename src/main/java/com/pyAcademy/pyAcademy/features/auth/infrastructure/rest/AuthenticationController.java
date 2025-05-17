package com.pyAcademy.pyAcademy.features.auth.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.auth.domain.service.UserDetailServiceImpl;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthCreateUserRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.request.AuthLoginRequest;
import com.pyAcademy.pyAcademy.features.auth.infrastructure.response.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthCreateUserRequest userRequest){
        return new ResponseEntity<>(this.userDetailService.createUser(userRequest), HttpStatus.CREATED);
    }


    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest userRequest){
        return new ResponseEntity<>(this.userDetailService.loginUser(userRequest), HttpStatus.OK);
    }
}