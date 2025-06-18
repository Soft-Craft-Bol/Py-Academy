package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import com.pyAcademy.pyAcademy.features.learning.domain.enums.MaterialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateMaterialRequest {
    private String title;
    private String description;
    private String url;
    private MaterialType materialType;
    private Integer durationMinutes;
    private Boolean isMandatory;
    private Integer sequenceNumber;
    private Long unitId;
}