package com.pyAcademy.pyAcademy.features.course.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseWithTeacherDetailsDTO {
    private CourseDetailsDTO course;
    private TeacherDetailsDTO teacher;

    public CourseWithTeacherDetailsDTO(CourseDetailsDTO course, TeacherDetailsDTO teacher) {
        this.course = course;
        this.teacher = teacher;
    }
}
