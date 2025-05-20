package com.pyAcademy.pyAcademy.features.learning.domain.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LearningUnit {
    private Long unitId;
    private String title;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer sequenceNumber;
    private Long courseId;
    private Set<Long> prerequisiteIds;
}