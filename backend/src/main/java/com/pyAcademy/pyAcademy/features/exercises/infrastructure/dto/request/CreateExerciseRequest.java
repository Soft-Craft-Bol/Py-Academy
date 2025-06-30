package com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request;

import java.util.List;
public record CreateExerciseRequest(
    String title,
    String description,
    String starterCode,
    String solutionCode,
    String language,
    String difficultyLevel,
    Integer sequenceNumber,
    List<TestCaseRequest> testCases
) {
    
}
