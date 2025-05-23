package com.pyAcademy.pyAcademy.features.course.application;

import com.pyAcademy.pyAcademy.features.course.domain.CourseTeacherRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseTeacherService {
    private final CourseTeacherRepository courseTeacherRepository;

    @Autowired
    public CourseTeacherService(CourseTeacherRepository courseTeacherRepository) {
        this.courseTeacherRepository = courseTeacherRepository;
    }

    public List<CourseTeacherEntity> getCourseTeacherRepository() {
        try {
            return courseTeacherRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el repositorio de CourseTeacher", e);
        }
    }



}
