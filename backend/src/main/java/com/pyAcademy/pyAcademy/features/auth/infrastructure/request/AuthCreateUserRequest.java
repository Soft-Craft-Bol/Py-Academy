package com.pyAcademy.pyAcademy.features.auth.infrastructure.request;



import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.StudentRegisterData;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.TeacherRegisterData;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

public record AuthCreateUserRequest(
        @NotBlank String username,
        @NotBlank String password,
        @NotBlank String email,
        @NotBlank String telefono,
        @NotBlank String nombre,
        @NotBlank String apellido,
        MultipartFile photo,
        AuthCreateRoleRequest roleRequest,
        StudentRegisterData studentData, // nullable
        TeacherRegisterData teacherData  // nullable
) {}
