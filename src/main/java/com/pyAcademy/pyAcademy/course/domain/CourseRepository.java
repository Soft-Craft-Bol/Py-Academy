package com.pyAcademy.pyAcademy.course.domain;

import com.pyAcademy.pyAcademy.course.model.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
}