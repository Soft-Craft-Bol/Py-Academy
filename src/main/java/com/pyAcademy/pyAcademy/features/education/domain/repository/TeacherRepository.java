package com.pyAcademy.pyAcademy.features.education.domain.repository;

import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {
}
