package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.domain.repository.StudentRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.adapters.jpa.CourseEnrollmentRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.CourseEnrollmentRequest;
import com.pyAcademy.pyAcademy.features.auth.domain.enums.RoleEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrollStudentToCourseUseCase {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final CourseEnrollmentRepository enrollmentRepository;

    @Transactional
    public void execute(CourseEnrollmentRequest request) {
        StudentEntity student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

        // Validar si el usuario tiene el rol STUDENT
        boolean isStudent = student.getRoles().stream()
                .anyMatch(role -> role.getRoleEnum() == RoleEnum.ESTUDIANTE);


        if (!isStudent) {
            throw new RuntimeException("Solo usuarios con rol STUDENT pueden inscribirse");
        }

        CourseEntity course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        // Verificar si ya está inscrito
        boolean alreadyEnrolled = course.getCourseEnrollments().stream()
                .anyMatch(enrollment -> enrollment.getStudent().getId().equals(student.getId()));
        if (alreadyEnrolled) {
            throw new RuntimeException("El estudiante ya está inscrito en este curso");
        }

        CourseEnrollmentsEntity enrollment = new CourseEnrollmentsEntity(student, course);
        enrollmentRepository.save(enrollment);
    }
}
