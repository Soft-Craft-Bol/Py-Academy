package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningUnitResponse {
    private Long unitId;
    private String title;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer sequenceNumber;
    private Long courseId;
    private List<Long> prerequisiteIds;
    private Integer materialCount;
}