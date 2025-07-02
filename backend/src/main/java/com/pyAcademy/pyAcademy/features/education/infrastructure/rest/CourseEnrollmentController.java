package com.pyAcademy.pyAcademy.features.education.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.education.application.usecase.EnrollStudentToCourseUseCase;
import com.pyAcademy.pyAcademy.features.education.application.usecase.GetCoursesByTeacherUseCase;
import com.pyAcademy.pyAcademy.features.education.application.usecase.GetStudentEnrolledCoursesUseCase;
import com.pyAcademy.pyAcademy.features.education.application.usecase.GetStudentsByCourseUseCase;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.CourseEnrollmentRequest;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.CreatedCourseResponse;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.EnrolledCourseResponse;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.StudentResponse;
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
    private final GetCoursesByTeacherUseCase getCoursesByTeacherUseCase;
    private final GetStudentsByCourseUseCase getStudentsByCourseUseCase;

    @PostMapping
    public ResponseEntity<String> enroll(@RequestBody CourseEnrollmentRequest request) {
        enrollStudentToCourseUseCase.execute(request);
        return ResponseEntity.ok("Inscripción realizada correctamente");
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EnrolledCourseResponse>> getEnrolledCourses(@PathVariable Long studentId) {
        return ResponseEntity.ok(getStudentEnrolledCoursesUseCase.execute(studentId));
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<CreatedCourseResponse>> getCoursesByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(getCoursesByTeacherUseCase.execute(teacherId));
    }

    @GetMapping("/{courseId}/students")
    public List<StudentResponse> getStudentsByCourseId(@PathVariable Long courseId) {
        return getStudentsByCourseUseCase.execute(courseId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    private StudentResponse mapToResponse(StudentEntity student) {
        return new StudentResponse(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getEnrollmentNumber(),
                student.getAcademicProgram(),
                student.getSemester(),
                student.getPhoto()
        );
    }
}
