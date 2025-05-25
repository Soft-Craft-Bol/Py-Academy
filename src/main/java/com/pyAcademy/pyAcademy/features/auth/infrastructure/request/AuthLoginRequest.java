package com.pyAcademy.pyAcademy.features.auth.infrastructure.request;

import jakarta.validation.constraints.NotBlank;

public record AuthLoginRequest(
        @NotBlank String email,
        @NotBlank String password
) {
}
