package com.pyAcademy.pyAcademy.features.auth.infrastructure.request;



import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

public record AuthCreateUserRequest(@NotBlank String username,
                                    @NotBlank String password,
                                    @NotBlank String email,
                                    @NotBlank String telefono,
                                    @NotBlank String nombre,
                                    @NotBlank String apellido,
                                    MultipartFile photo,
                                    AuthCreateRoleRequest roleRequest){
}