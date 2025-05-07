package com.pyAcademy.pyAcademy.user.infrastructure.request;



import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record AuthCreateUserRequest(@NotBlank String username,
                                    @NotBlank String password,
                                    @NotBlank String email,
                                    @NotBlank String telefono,
                                    @NotBlank String nombre,
                                    @NotBlank String apellido,
                                    String photo,
                                    AuthCreateRoleRequest roleRequest){
}