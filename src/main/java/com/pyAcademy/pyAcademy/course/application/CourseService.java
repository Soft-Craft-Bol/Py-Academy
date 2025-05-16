package com.pyAcademy.pyAcademy.course.application;

import com.pyAcademy.pyAcademy.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.course.model.CourseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public CourseEntity createCourse(CourseEntity course) {
        return courseRepository.save(course);
    }

    public CourseEntity updateCourse(Long id, CourseEntity course) {
        Optional<CourseEntity> existingCourse = courseRepository.findById(id);
        if (existingCourse.isPresent()) {
            course.setId(id);
            return courseRepository.save(course);
        }
        throw new RuntimeException("Curso no encontrado");
    }

    public void deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Curso no encontrado");
        }
    }
}