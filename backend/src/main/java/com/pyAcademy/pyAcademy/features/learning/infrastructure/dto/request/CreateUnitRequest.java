package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUnitRequest {
    private String title;
    private String description;
    private Boolean isActive;
    private Integer sequenceNumber;
    private Long courseId;
}