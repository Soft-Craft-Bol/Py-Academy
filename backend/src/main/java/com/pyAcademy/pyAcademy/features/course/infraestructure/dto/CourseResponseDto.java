package com.pyAcademy.pyAcademy.features.course.infraestructure.dto;

import java.time.LocalDate;

public record CourseResponseDto(
    Long id,
    String name,
    String description,
    Integer durationInHours,
    String level,
    Double price,
    String imageUrl,
    LocalDate startDate,
    LocalDate endDate,
    Integer maxStudents,
    boolean isActive,
    String teacherRole
) {}