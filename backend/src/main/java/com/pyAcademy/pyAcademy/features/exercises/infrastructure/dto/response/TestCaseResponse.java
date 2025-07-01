package com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestCaseResponse {
    private Long id;
    private String input;
    private String expectedOutput;
    private String description;
    private BigDecimal isHidden;
    private Integer sequenceNumber;
    private Boolean isActive;
}
