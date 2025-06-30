package com.pyAcademy.pyAcademy.features.course.application;

import com.pyAcademy.pyAcademy.features.course.domain.CourseTeacherRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import com.pyAcademy.pyAcademy.features.education.domain.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseTeacherService {
    private final CourseTeacherRepository courseTeacherRepository;
    private final TeacherRepository teacherRepository;
    
    @Autowired
    public CourseTeacherService(
            CourseTeacherRepository courseTeacherRepository,
            TeacherRepository teacherRepository
    ) {
        this.courseTeacherRepository = courseTeacherRepository;
        this.teacherRepository = teacherRepository;
    }

    public List<CourseTeacherEntity> getCourseTeacherRepository() {
        try {
            return courseTeacherRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el repositorio de CourseTeacher", e);
        }
    }
    
    public Optional<TeacherEntity> getTeacherById(Long teacherId) {
        return teacherRepository.findById(teacherId);
    }

    public void saveCourseTeacher(CourseTeacherEntity courseTeacher) {
        courseTeacherRepository.save(courseTeacher);
    }

    // Nuevos métodos para obtener cursos por profesor
    public List<CourseTeacherEntity> getCoursesByTeacherId(Long teacherId) {
        try {
            // Verificar que el profesor existe
            if (!teacherRepository.existsById(teacherId)) {
                throw new RuntimeException("Profesor no encontrado con ID: " + teacherId);
            }
            
            return courseTeacherRepository.findByTeacherId(teacherId);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener cursos del profesor con ID: " + teacherId, e);
        }
    }
    
    public List<CourseTeacherEntity> getActiveCoursesByTeacherId(Long teacherId) {
        try {
            // Verificar que el profesor existe
            if (!teacherRepository.existsById(teacherId)) {
                throw new RuntimeException("Profesor no encontrado con ID: " + teacherId);
            }
            
            return courseTeacherRepository.findActiveCoursesByTeacherId(teacherId);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener cursos activos del profesor con ID: " + teacherId, e);
        }
    }
}