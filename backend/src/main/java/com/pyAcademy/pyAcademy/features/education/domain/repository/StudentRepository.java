package com.pyAcademy.pyAcademy.features.education.domain.repository;

import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentEntity, Long > {
}
