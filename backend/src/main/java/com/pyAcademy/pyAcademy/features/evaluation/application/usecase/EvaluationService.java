package com.pyAcademy.pyAcademy.features.evaluation.application.usecase;

import com.pyAcademy.pyAcademy.features.evaluation.domain.EvaluationEntity;
import com.pyAcademy.pyAcademy.features.evaluation.domain.IEvaluationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final IEvaluationRepository evaluationRepository;

    public EvaluationEntity createEvaluation(EvaluationEntity evaluation) {
        return evaluationRepository.save(evaluation);
    }

    public List<EvaluationEntity> getEvaluationsByStudent(Long studentId) {
        return evaluationRepository.findByStudentId(studentId);
    }

    public List<EvaluationEntity> getEvaluationsByCourse(Long courseId) {
        return evaluationRepository.findByCourseId(courseId);
    }

    public List<EvaluationEntity> getEvaluationsByTeacher(Long teacherId) {
        return evaluationRepository.findByTeacherId(teacherId);
    }

    public void deleteEvaluation(Long evaluationId) {
        evaluationRepository.deleteById(evaluationId);
    }
    public EvaluationEntity updateScore(Long evaluationId, Double newScore) {
        EvaluationEntity evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new IllegalArgumentException("Evaluación no encontrada"));
        evaluation.setScore(newScore);
        return evaluationRepository.save(evaluation);
    }
    public EvaluationEntity updateDetails(Long evaluationId, String newTitle, String newDescription) {
        EvaluationEntity evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new IllegalArgumentException("Evaluación no encontrada"));
        evaluation.setTitle(newTitle);
        evaluation.setDescription(newDescription);
        return evaluationRepository.save(evaluation);
    }
    public EvaluationEntity markAsReviewed(Long evaluationId) {
        EvaluationEntity evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new IllegalArgumentException("Evaluación no encontrada"));
        evaluation.setDescription(evaluation.getDescription() + " (Revisada)");
        return evaluationRepository.save(evaluation);
    }
}