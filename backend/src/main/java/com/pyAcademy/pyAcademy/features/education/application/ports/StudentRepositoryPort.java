package com.pyAcademy.pyAcademy.features.education.application.ports;


import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import java.util.List;

public interface StudentRepositoryPort {
    List<StudentEntity> findStudentsByCourseId(Long courseId);
}