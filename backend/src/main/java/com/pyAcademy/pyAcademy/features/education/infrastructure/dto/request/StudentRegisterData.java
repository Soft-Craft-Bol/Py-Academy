package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request;

public record StudentRegisterData(
        String enrollmentNumber,
        String academicProgram,
        Integer semester
) {}