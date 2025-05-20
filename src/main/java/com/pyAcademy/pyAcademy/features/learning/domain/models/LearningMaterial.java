package com.pyAcademy.pyAcademy.features.learning.domain.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LearningMaterial {
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

    public enum MaterialType {
        VIDEO, PDF, PRESENTATION, LINK
    }
}