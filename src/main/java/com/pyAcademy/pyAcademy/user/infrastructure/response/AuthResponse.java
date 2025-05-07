package com.pyAcademy.pyAcademy.user.infrastructure.response;

import java.util.Set;

public record AuthResponse(
        String username,
        String message,
        String jwt,
        Boolean status,
        String photo){
}
