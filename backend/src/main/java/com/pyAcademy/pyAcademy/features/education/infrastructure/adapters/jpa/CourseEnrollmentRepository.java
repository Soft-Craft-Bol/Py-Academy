package com.pyAcademy.pyAcademy.features.education.infrastructure.adapters.jpa;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollmentsEntity, Long>
{
    List<CourseEnrollmentsEntity> findByStudentId(Long studentId);
    List<CourseEnrollmentsEntity> findByCourseId(Long courseId);
        @Query("SELECT COUNT(e) > 0 FROM CourseEnrollmentsEntity e " +
                "WHERE e.student.id = :studentId AND e.course.id = :courseId")
        boolean existsByStudentIdAndCourseId(
            @Param("studentId") Long studentId,
            @Param("courseId") Long courseId
    );
}
