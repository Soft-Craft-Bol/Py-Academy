package com.pyAcademy.pyAcademy.features.course.infraestructure;

import com.pyAcademy.pyAcademy.features.course.application.CourseService;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseEntity> createCourse(
            @RequestPart("course") CourseEntity course,
            @RequestParam("teacherId") Long teacherId,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {

        CourseEntity createdCourse;
            createdCourse = courseService.createCourse(course, teacherId, imageFile);
        return ResponseEntity.ok(createdCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseEntity> updateCourse(
            @PathVariable Long id,
            @RequestPart("course") CourseEntity course,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {

        CourseEntity updatedCourse = courseService.updateCourse(id, course, imageFile);
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