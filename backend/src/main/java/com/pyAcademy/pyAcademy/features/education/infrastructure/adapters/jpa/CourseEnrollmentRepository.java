package com.pyAcademy.pyAcademy.features.education.infrastructure.adapters.jpa;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollmentsEntity, Long>
{
    List<CourseEnrollmentsEntity> findByStudentId(Long studentId);
}
