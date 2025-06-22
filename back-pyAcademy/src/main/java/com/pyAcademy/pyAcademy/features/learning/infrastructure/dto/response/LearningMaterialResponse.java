package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response;

import com.pyAcademy.pyAcademy.features.learning.domain.enums.MaterialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningMaterialResponse {
    private Long materialId;
    private String title;
    private String description;
    private String url;
    private MaterialType materialType;
    private Integer durationMinutes;
    private Boolean isMandatory;
    private Integer sequenceNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long unitId;
}