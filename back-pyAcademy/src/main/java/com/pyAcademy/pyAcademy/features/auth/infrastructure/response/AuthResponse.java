package com.pyAcademy.pyAcademy.features.auth.infrastructure.response;

public record AuthResponse(
        String username,
        String message,
        String jwt,
        Boolean status,
        String photo){
}
