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
public class MaterialView {
    private Long id;
    private Long materialId;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer progressPercentage;
    private Boolean isCompleted;
}