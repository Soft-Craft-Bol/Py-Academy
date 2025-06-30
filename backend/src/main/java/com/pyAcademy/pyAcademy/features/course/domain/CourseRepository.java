package com.pyAcademy.pyAcademy.features.course.domain;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

}