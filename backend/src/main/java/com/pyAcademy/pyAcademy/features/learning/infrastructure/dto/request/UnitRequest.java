package com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;
import java.util.List;

@Getter
@Setter
public class UnitRequest {
    private String title;
    private String description;
    private Boolean isActive;
    private int sequenceNumber;
    private Long courseId;
    private List<TitleRequest> titles;
    
    @Data
    public static class TitleRequest {
        private String title;
        private String description;
        private Boolean isActive;
        private Integer sequenceNumber;
        private List<ContentRequest> contents;
    }
    
    @Data
    public static class ContentRequest {
        private String content;
    }
}