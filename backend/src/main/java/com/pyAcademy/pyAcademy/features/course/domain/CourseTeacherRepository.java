package com.pyAcademy.pyAcademy.features.course.domain;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseTeacherRepository extends JpaRepository<CourseTeacherEntity, Long> {

}
