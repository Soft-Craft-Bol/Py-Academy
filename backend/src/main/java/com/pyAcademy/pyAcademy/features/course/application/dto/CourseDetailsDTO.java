package com.pyAcademy.pyAcademy.features.course.application.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CourseDetailsDTO {
    private String name;
    private String description;
    private Integer durationInHours;
    private String level;
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maxStudents;
    private boolean isActive;

    public CourseDetailsDTO(String name, String description, Integer durationInHours, String level, Double price, LocalDate startDate, LocalDate endDate, Integer maxStudents, boolean isActive) {
        this.name = name;
        this.description = description;
        this.durationInHours = durationInHours;
        this.level = level;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.maxStudents = maxStudents;
        this.isActive = isActive;
    }
}