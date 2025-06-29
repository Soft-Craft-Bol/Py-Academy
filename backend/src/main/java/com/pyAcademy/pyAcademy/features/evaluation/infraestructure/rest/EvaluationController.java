package com.pyAcademy.pyAcademy.features.evaluation.infraestructure.rest;

import com.pyAcademy.pyAcademy.features.evaluation.domain.EvaluationEntity;
import com.pyAcademy.pyAcademy.features.evaluation.application.usecase.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluations")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping
    public ResponseEntity<EvaluationEntity> createEvaluation(@RequestBody EvaluationEntity evaluation) {
        EvaluationEntity createdEvaluation = evaluationService.createEvaluation(evaluation);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvaluation);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EvaluationEntity>> getEvaluationsByStudent(@PathVariable Long studentId) {
        List<EvaluationEntity> evaluations = evaluationService.getEvaluationsByStudent(studentId);
        return ResponseEntity.ok(evaluations);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<EvaluationEntity>> getEvaluationsByCourse(@PathVariable Long courseId) {
        List<EvaluationEntity> evaluations = evaluationService.getEvaluationsByCourse(courseId);
        return ResponseEntity.ok(evaluations);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<EvaluationEntity>> getEvaluationsByTeacher(@PathVariable Long teacherId) {
        List<EvaluationEntity> evaluations = evaluationService.getEvaluationsByTeacher(teacherId);
        return ResponseEntity.ok(evaluations);
    }

    @DeleteMapping("/{evaluationId}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long evaluationId) {
        evaluationService.deleteEvaluation(evaluationId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{evaluationId}/score")
    public ResponseEntity<EvaluationEntity> updateScore(@PathVariable Long evaluationId, @RequestParam Double newScore) {
        EvaluationEntity updatedEvaluation = evaluationService.updateScore(evaluationId, newScore);
        return ResponseEntity.ok(updatedEvaluation);
    }

    @PatchMapping("/{evaluationId}/details")
    public ResponseEntity<EvaluationEntity> updateDetails(
            @PathVariable Long evaluationId,
            @RequestParam String newTitle,
            @RequestParam String newDescription) {
        EvaluationEntity updatedEvaluation = evaluationService.updateDetails(evaluationId, newTitle, newDescription);
        return ResponseEntity.ok(updatedEvaluation);
    }

    @PatchMapping("/{evaluationId}/reviewed")
    public ResponseEntity<EvaluationEntity> markAsReviewed(@PathVariable Long evaluationId) {
        EvaluationEntity reviewedEvaluation = evaluationService.markAsReviewed(evaluationId);
        return ResponseEntity.ok(reviewedEvaluation);
    }
}