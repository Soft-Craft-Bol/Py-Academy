package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UnitRequest {
    private String title;
    private String description;
    private Boolean isActive;
    private int sequenceNumber;
    private List<TitleRequest> titles;
}