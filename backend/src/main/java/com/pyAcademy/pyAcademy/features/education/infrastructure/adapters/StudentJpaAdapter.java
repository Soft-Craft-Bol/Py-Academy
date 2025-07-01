package com.pyAcademy.pyAcademy.features.education.infrastructure.adapters;

import com.pyAcademy.pyAcademy.features.education.application.ports.StudentRepositoryPort;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.infrastructure.adapters.jpa.CourseEnrollmentRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class StudentJpaAdapter implements StudentRepositoryPort {

    private final CourseEnrollmentRepository courseEnrollmentsRepository;

    public StudentJpaAdapter(CourseEnrollmentRepository courseEnrollmentsRepository) {
        this.courseEnrollmentsRepository = courseEnrollmentsRepository;
    }

    @Override
    public List<StudentEntity> findStudentsByCourseId(Long courseId) {
        return courseEnrollmentsRepository.findByCourseId(courseId).stream()
                .map(enrollment -> enrollment.getStudent())
                .collect(Collectors.toList());
    }
}