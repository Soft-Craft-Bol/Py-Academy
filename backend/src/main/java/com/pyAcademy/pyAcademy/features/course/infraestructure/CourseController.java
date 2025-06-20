package com.pyAcademy.pyAcademy.features.course.infraestructure;

import com.pyAcademy.pyAcademy.features.course.application.CourseService;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseEntity> createCourse(
            @Valid @RequestBody CourseEntity course,
            @RequestParam Long teacherId) {
        CourseEntity createdCourse = courseService.createCourse(course, teacherId);
        return ResponseEntity.ok(createdCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseEntity> updateCourse(@PathVariable Long id, @RequestBody CourseEntity course) {
        CourseEntity updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String,Object>> getAllCourses() {
        Map<String, Object> response = courseService.getAllCourses();
        return ResponseEntity.ok(response);
    }
}