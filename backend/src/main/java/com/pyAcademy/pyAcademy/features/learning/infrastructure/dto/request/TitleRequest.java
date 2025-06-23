package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import java.util.List;

public record TitleRequest(
        String title,
        String description,
        Boolean isActive,
        Integer sequenceNumber,
        List<ContentRequest> contents
) {}