package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreatedCourseResponse(
        Long id,
        String name,
        String description,
        Integer durationInHours,
        String level,
        Double price,
        String startDate,
        String endDate,
        String image
) {
    public CreatedCourseResponse(Long id, @NotBlank(message = "El nombre es obligatorio") String name, @NotBlank(message = "La descripción es obligatoria") String description, @NotNull(message = "La duración es obligatoria") @Min(value = 1, message = "La duración debe ser al menos 1 hora") Integer durationInHours, @NotBlank(message = "El nivel es obligatorio") String level, @NotNull(message = "El precio es obligatorio") @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0") Double price, @NotNull(message = "La fecha de inicio es obligatoria") LocalDate startDate, @NotNull(message = "La fecha de fin es obligatoria") LocalDate endDate, boolean active, String image) {
        this(
                id,
                name,
                description,
                durationInHours,
                level,
                price,
                startDate.toString(),
                endDate.toString(),
                image.toString()
        );
    }
}
