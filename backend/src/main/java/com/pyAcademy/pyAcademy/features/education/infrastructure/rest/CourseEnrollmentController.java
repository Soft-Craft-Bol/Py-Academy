package com.pyAcademy.pyAcademy.features.education.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.education.application.usecase.EnrollStudentToCourseUseCase;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.CourseEnrollmentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses/enrollments")
@RequiredArgsConstructor
public class CourseEnrollmentController {

    private final EnrollStudentToCourseUseCase enrollStudentToCourseUseCase;

    @PostMapping
    public ResponseEntity<String> enroll(@RequestBody CourseEnrollmentRequest request) {
        enrollStudentToCourseUseCase.execute(request);
        return ResponseEntity.ok("Inscripción realizada correctamente");
    }
}
