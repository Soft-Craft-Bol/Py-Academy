package com.pyAcademy.pyAcademy.features.course.domain;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseTeacherRepository extends JpaRepository<CourseTeacherEntity, Long> {
    
    @Query("SELECT ct FROM CourseTeacherEntity ct WHERE ct.teacher.id = :teacherId")
    List<CourseTeacherEntity> findByTeacherId(@Param("teacherId") Long teacherId);
    
    @Query("SELECT ct FROM CourseTeacherEntity ct WHERE ct.teacher.id = :teacherId AND ct.course.isActive = true")
    List<CourseTeacherEntity> findActiveCoursesByTeacherId(@Param("teacherId") Long teacherId);
}