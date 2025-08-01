package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

import java.time.LocalDate;

public record EnrolledCourseResponse(
        Long id,
        String name,//coment
        String description,
        Integer durationInHours,
        String level,
        Double price,
        LocalDate startDate,
        LocalDate endDate,
        String image
) {
}
