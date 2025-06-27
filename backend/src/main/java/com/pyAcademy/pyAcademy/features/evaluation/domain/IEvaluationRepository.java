package com.pyAcademy.pyAcademy.features.evaluation.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEvaluationRepository extends JpaRepository<EvaluationEntity, Long> {
    List<EvaluationEntity> findByStudentId(Long studentId);
    List<EvaluationEntity> findByCourseId(Long courseId);
    List<EvaluationEntity> findByTeacherId(Long teacherId);
}
