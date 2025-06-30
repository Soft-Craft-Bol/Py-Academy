package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

public record StudentResponse(
         Long id,
         String firstName,
         String lastName,
         String email,
         String enrollmentNumber,
         String academicProgram,
         Integer semester,
         String photo
) {
}
