package com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.response;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseResponse {
    private Long id;
    private String title;
    private String description;
    private String starterCode;
    private String solutionCode;
    private String language;
    private String difficultyLevel;
    private Integer sequenceNumber;
    private Boolean isActive;
    private java.sql.Timestamp createdAt;
    private java.sql.Timestamp updatedAt;
    private List<TestCaseResponse> testCases;
}
