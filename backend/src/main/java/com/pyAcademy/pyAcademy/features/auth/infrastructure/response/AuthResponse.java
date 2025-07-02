package com.pyAcademy.pyAcademy.features.auth.infrastructure.response;

public record AuthResponse(
        String username,
        Long id,
        String message,
        String jwt,
        Boolean status,
        String photo){
}
