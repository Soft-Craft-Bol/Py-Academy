package com.pyAcademy.pyAcademy.features.education.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.course.application.CourseTeacherService;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import com.pyAcademy.pyAcademy.features.course.infraestructure.dto.CourseResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    
    @Autowired
    private CourseTeacherService courseTeacherService;
    
    @GetMapping("/{teacherId}/courses")
    public ResponseEntity<List<CourseResponseDto>> getCoursesByTeacher(
            @PathVariable Long teacherId,
            @RequestParam(defaultValue = "false") boolean activeOnly) {
        
        try {
            List<CourseTeacherEntity> courseTeachers;
            
            if (activeOnly) {
                courseTeachers = courseTeacherService.getActiveCoursesByTeacherId(teacherId);
            } else {
                courseTeachers = courseTeacherService.getCoursesByTeacherId(teacherId);
            }
            
            List<CourseResponseDto> courses = courseTeachers.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(courses);
            
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/{teacherId}/courses/active")
    public ResponseEntity<List<CourseResponseDto>> getActiveCoursesByTeacher(
            @PathVariable Long teacherId) {
        
        try {
            List<CourseTeacherEntity> courseTeachers = courseTeacherService.getActiveCoursesByTeacherId(teacherId);
            
            List<CourseResponseDto> courses = courseTeachers.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(courses);
            
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    private CourseResponseDto convertToDto(CourseTeacherEntity courseTeacher) {
        return new CourseResponseDto(
                courseTeacher.getCourse().getId(),
                courseTeacher.getCourse().getName(),
                courseTeacher.getCourse().getDescription(),
                courseTeacher.getCourse().getDurationInHours(),
                courseTeacher.getCourse().getLevel(),
                courseTeacher.getCourse().getPrice(),
                courseTeacher.getCourse().getImageUrl(),
                courseTeacher.getCourse().getStartDate(),
                courseTeacher.getCourse().getEndDate(),
                courseTeacher.getCourse().getMaxStudents(),
                courseTeacher.getCourse().isActive(),
                courseTeacher.getRole()
        );
    }
}
