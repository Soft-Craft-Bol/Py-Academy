package com.pyAcademy.pyAcademy.course.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.course.domain.models.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Integer> {

}
