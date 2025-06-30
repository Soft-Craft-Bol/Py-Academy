package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

public record StudentDetailsResponse(
        Long id,
        String username,
        String firstName,
        String lastName,
        String email,
        Long telefono,
        String photo,
        String userType,
        String enrollmentNumber,
        String academicProgram,
        Integer semester,
        String progressSummary
) {}
