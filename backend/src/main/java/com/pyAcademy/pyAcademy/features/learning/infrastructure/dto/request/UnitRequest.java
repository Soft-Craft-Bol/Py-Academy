package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import java.util.List;

public record UnitRequest(
        String title,
        String description,
        Boolean isActive,
        Integer sequenceNumber,
        List<TitleRequest> titles
) {}