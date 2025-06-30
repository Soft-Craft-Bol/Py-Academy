package com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request;

public record TestCaseRequest(
    String inputData,
    String expectedOutput,
    Boolean isHidden,
    Integer weight
) {}
