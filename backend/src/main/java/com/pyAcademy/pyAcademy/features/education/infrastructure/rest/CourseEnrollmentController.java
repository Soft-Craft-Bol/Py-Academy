package com.pyAcademy.pyAcademy.features.education.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.education.application.usecase.EnrollStudentToCourseUseCase;
import com.pyAcademy.pyAcademy.features.education.application.usecase.GetStudentEnrolledCoursesUseCase;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.CourseEnrollmentRequest;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.EnrolledCourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses/enrollments")
@RequiredArgsConstructor
public class CourseEnrollmentController {

    private final EnrollStudentToCourseUseCase enrollStudentToCourseUseCase;
    private final GetStudentEnrolledCoursesUseCase getStudentEnrolledCoursesUseCase;

    @PostMapping
    public ResponseEntity<String> enroll(@RequestBody CourseEnrollmentRequest request) {
        enrollStudentToCourseUseCase.execute(request);
        return ResponseEntity.ok("Inscripción realizada correctamente");
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EnrolledCourseResponse>> getEnrolledCourses(@PathVariable Long studentId) {
        return ResponseEntity.ok(getStudentEnrolledCoursesUseCase.execute(studentId));
    }
}
