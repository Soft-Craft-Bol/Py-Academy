package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UnitResponse {
    private Long unitId;
    private String title;
    private String description;
    private Boolean isActive;
    private Integer sequenceNumber;
    private Long courseId;
    private List<TitleResponse> titles;
}