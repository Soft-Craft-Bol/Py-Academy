package com.pyAcademy.pyAcademy.features.exercises.infrastructure;

import com.pyAcademy.pyAcademy.features.exercises.application.ExercisesService;
import com.pyAcademy.pyAcademy.features.exercises.application.usecase.CreateExerciseUseCase;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.CreateExerciseRequest;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.ExercisesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/exercises")
@CrossOrigin(origins = "*")
public class ExercisesController {
    
    @Autowired
    private ExercisesService exercisesService;

    @Autowired
    private CreateExerciseUseCase createExerciseUseCase;

    
    // === CODING EXERCISES ENDPOINTS ===

    
    @GetMapping
    public ResponseEntity<List<ExercisesDTO.CodingExerciseDTO>> getAllActiveExercises() {
        List<ExercisesDTO.CodingExerciseDTO> exercises = exercisesService.getAllActiveExercises();
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/language/{language}")
    public ResponseEntity<List<ExercisesDTO.CodingExerciseDTO>> getExercisesByLanguage(@PathVariable String language) {
        List<ExercisesDTO.CodingExerciseDTO> exercises = exercisesService.getExercisesByLanguage(language);
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<ExercisesDTO.CodingExerciseDTO>> getExercisesByDifficulty(@PathVariable String difficulty) {
        List<ExercisesDTO.CodingExerciseDTO> exercises = exercisesService.getExercisesByDifficulty(difficulty);
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<ExercisesDTO.CodingExerciseDTO>> getExercisesByLanguageAndDifficulty(
            @RequestParam String language,
            @RequestParam String difficulty) {
        List<ExercisesDTO.CodingExerciseDTO> exercises = exercisesService.getExercisesByLanguageAndDifficulty(language, difficulty);
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ExercisesDTO.CodingExerciseDTO> getExerciseById(@PathVariable Long id) {
        Optional<ExercisesDTO.CodingExerciseDTO> exercise = exercisesService.getExerciseById(id);
        return exercise.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/with-test-cases")
    public ResponseEntity<ExercisesDTO.CodingExerciseDTO> getExerciseWithTestCases(@PathVariable Long id) {
        Optional<ExercisesDTO.CodingExerciseDTO> exercise = exercisesService.getExerciseWithTestCases(id);
        return exercise.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    // === SUBMISSIONS ENDPOINTS ===
    
    @GetMapping("/submissions/student/{studentId}")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSubmissionsByStudent(@PathVariable Long studentId) {
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSubmissionsByStudent(studentId);
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/{exerciseId}/submissions")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSubmissionsByExercise(@PathVariable Long exerciseId) {
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSubmissionsByExercise(exerciseId);
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/submissions/student/{studentId}/exercise/{exerciseId}")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSubmissionsByStudentAndExercise(
            @PathVariable Long studentId,
            @PathVariable Long exerciseId) {
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSubmissionsByStudentAndExercise(studentId, exerciseId);
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/submissions/student/{studentId}/exercise/{exerciseId}/successful")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSuccessfulSubmissionsByStudentAndExercise(
            @PathVariable Long studentId,
            @PathVariable Long exerciseId) {
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSuccessfulSubmissionsByStudentAndExercise(studentId, exerciseId);
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/submissions/status/{status}")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSubmissionsByStatus(@PathVariable String status) {
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSubmissionsByStatus(status);
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/submissions/{submissionId}/with-test-results")
    public ResponseEntity<ExercisesDTO.SubmissionDTO> getSubmissionWithTestResults(@PathVariable Long submissionId) {
        Optional<ExercisesDTO.SubmissionDTO> submission = exercisesService.getSubmissionWithTestResults(submissionId);
        return submission.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/submissions/date-range")
    public ResponseEntity<List<ExercisesDTO.SubmissionDTO>> getSubmissionsByDateRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate) {
        Timestamp start = new Timestamp(startDate.getTime());
        Timestamp end = new Timestamp(endDate.getTime());
        List<ExercisesDTO.SubmissionDTO> submissions = exercisesService.getSubmissionsByDateRange(start, end);
        return ResponseEntity.ok(submissions);
    }
    
    // === TEST CASES ENDPOINTS ===
    
    @GetMapping("/{exerciseId}/test-cases")
    public ResponseEntity<List<ExercisesDTO.TestCaseDTO>> getTestCasesByExercise(@PathVariable Long exerciseId) {
        List<ExercisesDTO.TestCaseDTO> testCases = exercisesService.getTestCasesByExercise(exerciseId);
        return ResponseEntity.ok(testCases);
    }
    
    @GetMapping("/{exerciseId}/test-cases/visible")
    public ResponseEntity<List<ExercisesDTO.TestCaseDTO>> getVisibleTestCasesByExercise(@PathVariable Long exerciseId) {
        List<ExercisesDTO.TestCaseDTO> testCases = exercisesService.getVisibleTestCasesByExercise(exerciseId);
        return ResponseEntity.ok(testCases);
    }
    
    
    // === TEACHER FEEDBACKS ENDPOINTS ===
    
    @GetMapping("/submissions/{submissionId}/feedbacks")
    public ResponseEntity<List<ExercisesDTO.TeacherFeedbackDTO>> getFeedbacksBySubmission(@PathVariable Long submissionId) {
        List<ExercisesDTO.TeacherFeedbackDTO> feedbacks = exercisesService.getFeedbacksBySubmission(submissionId);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/feedbacks/teacher/{teacherId}")
    public ResponseEntity<List<ExercisesDTO.TeacherFeedbackDTO>> getFeedbacksByTeacher(@PathVariable Long teacherId) {
        List<ExercisesDTO.TeacherFeedbackDTO> feedbacks = exercisesService.getFeedbacksByTeacher(teacherId);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/feedbacks/student/{studentId}")
    public ResponseEntity<List<ExercisesDTO.TeacherFeedbackDTO>> getFeedbacksByStudent(@PathVariable Long studentId) {
        List<ExercisesDTO.TeacherFeedbackDTO> feedbacks = exercisesService.getFeedbacksByStudent(studentId);
        return ResponseEntity.ok(feedbacks);
    }
    
    @GetMapping("/{exerciseId}/feedbacks")
    public ResponseEntity<List<ExercisesDTO.TeacherFeedbackDTO>> getFeedbacksByExercise(@PathVariable Long exerciseId) {
        List<ExercisesDTO.TeacherFeedbackDTO> feedbacks = exercisesService.getFeedbacksByExercise(exerciseId);
        return ResponseEntity.ok(feedbacks);
    }
    
    // === TEST CASE RESULTS ENDPOINTS ===
    
    @GetMapping("/submissions/{submissionId}/test-results")
    public ResponseEntity<List<ExercisesDTO.TestCaseResultDTO>> getTestResultsBySubmission(@PathVariable Long submissionId) {
        List<ExercisesDTO.TestCaseResultDTO> results = exercisesService.getTestResultsBySubmission(submissionId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/submissions/{submissionId}/test-results/passed")
    public ResponseEntity<List<ExercisesDTO.TestCaseResultDTO>> getPassedTestResultsBySubmission(@PathVariable Long submissionId) {
        List<ExercisesDTO.TestCaseResultDTO> results = exercisesService.getPassedTestResultsBySubmission(submissionId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/submissions/{submissionId}/test-results/failed")
    public ResponseEntity<List<ExercisesDTO.TestCaseResultDTO>> getFailedTestResultsBySubmission(@PathVariable Long submissionId) {
        List<ExercisesDTO.TestCaseResultDTO> results = exercisesService.getFailedTestResultsBySubmission(submissionId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/submissions/{submissionId}/test-results/count/passed")
    public ResponseEntity<Long> getPassedTestCasesCount(@PathVariable Long submissionId) {
        Long count = exercisesService.getPassedTestCasesCount(submissionId);
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/submissions/{submissionId}/test-results/count/total")
    public ResponseEntity<Long> getTotalTestCasesCount(@PathVariable Long submissionId) {
        Long count = exercisesService.getTotalTestCasesCount(submissionId);
        return ResponseEntity.ok(count);
    }

    @PostMapping
    public ResponseEntity<CodingExercisesEntity> createExercise(@RequestBody CreateExerciseRequest request) {
        CodingExercisesEntity created = createExerciseUseCase.create(request);
        return ResponseEntity.ok(created);
    }
}
