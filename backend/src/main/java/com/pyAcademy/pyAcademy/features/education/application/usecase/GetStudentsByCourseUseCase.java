package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.education.application.ports.StudentRepositoryPort;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetStudentsByCourseUseCase {
    private final StudentRepositoryPort studentRepositoryPort;

    public GetStudentsByCourseUseCase(StudentRepositoryPort studentRepositoryPort) {
        this.studentRepositoryPort = studentRepositoryPort;
    }

    public List<StudentEntity> execute(Long courseId) {
        return studentRepositoryPort.findStudentsByCourseId(courseId);
    }



}
