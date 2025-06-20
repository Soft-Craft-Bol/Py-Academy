package com.pyAcademy.pyAcademy.features.auth.infrastructure.request;

import jakarta.validation.constraints.Size;

import java.util.List;

public record AuthCreateRoleRequest(
        @Size(max = 3, message = "The auth cannot have more than 3 roles") List<String> roleListName
) {
}
