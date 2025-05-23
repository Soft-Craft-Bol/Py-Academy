package com.pyAcademy.pyAcademy.features.course.application;

import com.pyAcademy.pyAcademy.features.course.application.dto.CourseDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.application.dto.CourseWithTeacherDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.application.dto.TeacherDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseTeacherService courseTeacherService;

    @Autowired
    private CourseService(
            CourseRepository courseRepository,
            CourseTeacherService courseTeacherService
    ){
        this.courseRepository = courseRepository;
        this.courseTeacherService = courseTeacherService;
    }

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
    public Map<String, Object> getAllCourses() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<CourseEntity> courses = courseRepository.findAll();
            List<CourseWithTeacherDetailsDTO> coursesWithTeachers = courses.stream().map(course -> {
                Optional<CourseTeacherEntity> courseTeacher = courseTeacherService.getCourseTeacherRepository()
                        .stream()
                        .filter(ct -> ct.getCourse().getId().equals(course.getId()))
                        .findFirst();
                CourseDetailsDTO courseDetails = new CourseDetailsDTO(
                        course.getName(),
                        course.getDescription(),
                        course.getDurationInHours(),
                        course.getLevel(),
                        course.getPrice(),
                        course.getStartDate(),
                        course.getEndDate(),
                        course.getMaxStudents(),
                        course.isActive()
                );
                TeacherDetailsDTO teacherDetails = courseTeacher.map(ct -> new TeacherDetailsDTO(
                        ct.getTeacher().getFirstName(),
                        ct.getTeacher().getLastName(),
                        ct.getTeacher().getEmail(),
                        ct.getTeacher().getTelefono(),
                        ct.getTeacher().getPhoto()
                )).orElse(null);
                return new CourseWithTeacherDetailsDTO(courseDetails, teacherDetails);
            }).toList();

            response.put("cursosConProfesor", coursesWithTeachers);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los cursos", e);
        }
        return response;
    }

}