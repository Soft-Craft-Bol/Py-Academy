package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

public record TeacherDetailsResponse(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        Long telefono,
        String photo,
        String userType,
        String department,
        String specialization,
        String academicDegree
) {}