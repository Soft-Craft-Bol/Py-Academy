package com.pyAcademy.pyAcademy.features.exercises.application;

import com.pyAcademy.pyAcademy.features.exercises.domain.models.*;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.*;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.CodingExercisesRepository;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.ExerciseSubmissionsRepository;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.TeacherFeedbacksRepository;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.TestCaseResultsRepository;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.TestCasesRepository;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.ExercisesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExercisesService {
    
    @Autowired
    private CodingExercisesRepository codingExercisesRepository;
    
    @Autowired
    private ExerciseSubmissionsRepository submissionsRepository;
    
    @Autowired
    private TestCasesRepository testCasesRepository;
    
    @Autowired
    private TeacherFeedbacksRepository feedbacksRepository;
    
    @Autowired
    private TestCaseResultsRepository testResultsRepository;
    
    // === CODING EXERCISES METHODS ===
    
    public List<ExercisesDTO.CodingExerciseDTO> getAllActiveExercises() {
    
    List<CodingExercisesEntity> exercises = codingExercisesRepository.findAllActiveWithTestCases();
    
    return exercises.stream().map(this::convertToExerciseDTOWithTestCases).collect(Collectors.toList());
}
    
    public List<ExercisesDTO.CodingExerciseDTO> getExercisesByLanguage(String language) {
        List<CodingExercisesEntity> exercises = codingExercisesRepository.findByLanguageAndIsActiveTrueOrderBySequenceNumber(language);
        return exercises.stream().map(this::convertToExerciseDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.CodingExerciseDTO> getExercisesByDifficulty(String difficulty) {
        List<CodingExercisesEntity> exercises = codingExercisesRepository.findByDifficultyLevelAndIsActiveTrueOrderBySequenceNumber(difficulty);
        return exercises.stream().map(this::convertToExerciseDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.CodingExerciseDTO> getExercisesByLanguageAndDifficulty(String language, String difficulty) {
        List<CodingExercisesEntity> exercises = codingExercisesRepository.findByLanguageAndDifficultyAndActive(language, difficulty);
        return exercises.stream().map(this::convertToExerciseDTO).collect(Collectors.toList());
    }
    
    public Optional<ExercisesDTO.CodingExerciseDTO> getExerciseById(Long id) {
        Optional<CodingExercisesEntity> exercise = codingExercisesRepository.findByIdAndIsActiveTrue(id);
        return exercise.map(this::convertToExerciseDTO);
    }
    
    public Optional<ExercisesDTO.CodingExerciseDTO> getExerciseWithTestCases(Long id) {
        Optional<CodingExercisesEntity> exercise = codingExercisesRepository.findByIdWithTestCases(id);
        return exercise.map(this::convertToExerciseDTOWithTestCases);
    }
    
    // === SUBMISSIONS METHODS ===
    
    public List<ExercisesDTO.SubmissionDTO> getSubmissionsByStudent(Long studentId) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findByStudentIdOrderBySubmissionTimeDesc(studentId);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.SubmissionDTO> getSubmissionsByExercise(Long exerciseId) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findByExerciseIdOrderBySubmissionTimeDesc(exerciseId);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.SubmissionDTO> getSubmissionsByStudentAndExercise(Long studentId, Long exerciseId) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findByStudentAndExercise(studentId, exerciseId);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.SubmissionDTO> getSuccessfulSubmissionsByStudentAndExercise(Long studentId, Long exerciseId) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findSuccessfulSubmissionsByStudentAndExercise(studentId, exerciseId);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.SubmissionDTO> getSubmissionsByStatus(String status) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findByStatusOrderBySubmissionTimeDesc(status);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    public Optional<ExercisesDTO.SubmissionDTO> getSubmissionWithTestResults(Long submissionId) {
        Optional<ExerciseSubmissionsEntity> submission = submissionsRepository.findByIdWithTestResults(submissionId);
        return submission.map(this::convertToSubmissionDTOWithTestResults);
    }
    
    public List<ExercisesDTO.SubmissionDTO> getSubmissionsByDateRange(Timestamp startDate, Timestamp endDate) {
        List<ExerciseSubmissionsEntity> submissions = submissionsRepository.findBySubmissionTimeBetween(startDate, endDate);
        return submissions.stream().map(this::convertToSubmissionDTO).collect(Collectors.toList());
    }
    
    // === TEST CASES METHODS ===
    
    public List<ExercisesDTO.TestCaseDTO> getTestCasesByExercise(Long exerciseId) {
        List<TestCasesEntity> testCases = testCasesRepository.findByExerciseIdOrderByWeight(exerciseId);
        return testCases.stream().map(this::convertToTestCaseDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TestCaseDTO> getVisibleTestCasesByExercise(Long exerciseId) {
        List<TestCasesEntity> testCases = testCasesRepository.findVisibleTestCasesByExercise(exerciseId);
        return testCases.stream().map(this::convertToTestCaseDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TestCaseDTO> getHiddenTestCasesByExercise(Long exerciseId) {
        List<TestCasesEntity> testCases = testCasesRepository.findHiddenTestCasesByExercise(exerciseId);
        return testCases.stream().map(this::convertToTestCaseDTO).collect(Collectors.toList());
    }
    
    // === TEACHER FEEDBACKS METHODS ===
    
    public List<ExercisesDTO.TeacherFeedbackDTO> getFeedbacksBySubmission(Long submissionId) {
        List<TeacherFeedbacksEntity> feedbacks = feedbacksRepository.findBySubmissionIdOrderByGivenAtDesc(submissionId);
        return feedbacks.stream().map(this::convertToFeedbackDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TeacherFeedbackDTO> getFeedbacksByTeacher(Long teacherId) {
        List<TeacherFeedbacksEntity> feedbacks = feedbacksRepository.findByTeacherIdOrderByGivenAtDesc(teacherId);
        return feedbacks.stream().map(this::convertToFeedbackDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TeacherFeedbackDTO> getFeedbacksByStudent(Long studentId) {
        List<TeacherFeedbacksEntity> feedbacks = feedbacksRepository.findByStudentId(studentId);
        return feedbacks.stream().map(this::convertToFeedbackDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TeacherFeedbackDTO> getFeedbacksByExercise(Long exerciseId) {
        List<TeacherFeedbacksEntity> feedbacks = feedbacksRepository.findByExerciseId(exerciseId);
        return feedbacks.stream().map(this::convertToFeedbackDTO).collect(Collectors.toList());
    }
    
    // === TEST CASE RESULTS METHODS ===
    
    public List<ExercisesDTO.TestCaseResultDTO> getTestResultsBySubmission(Long submissionId) {
        List<TestCaseResultsEntity> results = testResultsRepository.findBySubmissionId(submissionId);
        return results.stream().map(this::convertToTestResultDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TestCaseResultDTO> getPassedTestResultsBySubmission(Long submissionId) {
        List<TestCaseResultsEntity> results = testResultsRepository.findPassedResultsBySubmission(submissionId);
        return results.stream().map(this::convertToTestResultDTO).collect(Collectors.toList());
    }
    
    public List<ExercisesDTO.TestCaseResultDTO> getFailedTestResultsBySubmission(Long submissionId) {
        List<TestCaseResultsEntity> results = testResultsRepository.findFailedResultsBySubmission(submissionId);
        return results.stream().map(this::convertToTestResultDTO).collect(Collectors.toList());
    }
    
    public Long getPassedTestCasesCount(Long submissionId) {
        return testResultsRepository.countPassedTestCasesBySubmission(submissionId);
    }
    
    public Long getTotalTestCasesCount(Long submissionId) {
        return testResultsRepository.countTotalTestCasesBySubmission(submissionId);
    }
    
    // === CONVERSION METHODS ===
    
    private ExercisesDTO.CodingExerciseDTO convertToExerciseDTO(CodingExercisesEntity entity) {
        return new ExercisesDTO.CodingExerciseDTO(
            entity.getId(),
            entity.getTitle(),
            entity.getDescription(),
            entity.getStarterCode(),
            entity.getLanguage(),
            entity.getDifficultyLevel(),
            entity.getSequenceNumber(),
            entity.getIsActive(),
            entity.getCreatedAt()
        );
    }
    
    private ExercisesDTO.CodingExerciseDTO convertToExerciseDTOWithTestCases(CodingExercisesEntity entity) {
        ExercisesDTO.CodingExerciseDTO dto = convertToExerciseDTO(entity);
        if (entity.getTestCases() != null) {
            List<ExercisesDTO.TestCaseDTO> testCaseDTOs = entity.getTestCases().stream()
                .map(this::convertToTestCaseDTO)
                .collect(Collectors.toList());
            dto.setTestCases(testCaseDTOs);
        }
        return dto;
    }
    
    private ExercisesDTO.SubmissionDTO convertToSubmissionDTO(ExerciseSubmissionsEntity entity) {
        String exerciseTitle = entity.getExercise() != null ? entity.getExercise().getTitle() : "";
        String studentName = entity.getStudent() != null ? entity.getStudent().getFirstName() : "";
        
        return new ExercisesDTO.SubmissionDTO(
            entity.getId(),
            entity.getCode(),
            entity.getLanguage(),
            entity.getSubmissionTime(),
            entity.getExecutionTimeMs(),
            entity.getMemoryUsageKb(),
            entity.getStatus(),
            entity.getExercise().getId(),
            entity.getStudent().getId(),
            exerciseTitle,
            studentName
        );
    }
    
    private ExercisesDTO.SubmissionDTO convertToSubmissionDTOWithTestResults(ExerciseSubmissionsEntity entity) {
        ExercisesDTO.SubmissionDTO dto = convertToSubmissionDTO(entity);
        if (entity.getTestCaseResults() != null) {
            List<ExercisesDTO.TestCaseResultDTO> testResultDTOs = entity.getTestCaseResults().stream()
                .map(this::convertToTestResultDTO)
                .collect(Collectors.toList());
            dto.setTestResults(testResultDTOs);
        }
        return dto;
    }
    
    private ExercisesDTO.TestCaseDTO convertToTestCaseDTO(TestCasesEntity entity) {
        Boolean isHidden = entity.getIsHidden() != null && entity.getIsHidden().compareTo(BigDecimal.ZERO) > 0;
        return new ExercisesDTO.TestCaseDTO(
            entity.getId(),
            entity.getInputData(),
            entity.getExpectedOutput(),
            isHidden,
            entity.getWeight()
        );
    }
    
    private ExercisesDTO.TestCaseResultDTO convertToTestResultDTO(TestCaseResultsEntity entity) {
        String inputData = entity.getTestCase() != null ? entity.getTestCase().getInputData() : "";
        String expectedOutput = entity.getTestCase() != null ? entity.getTestCase().getExpectedOutput() : "";
        Long testCaseId = entity.getTestCase() != null ? entity.getTestCase().getId() : null;
        
        return new ExercisesDTO.TestCaseResultDTO(
            entity.getId(),
            entity.getActualOutput(),
            entity.getIsPassed(),
            entity.getExecutionTimeMs(),
            entity.getErrorMessage(),
            testCaseId,
            inputData,
            expectedOutput
        );
    }
    
    private ExercisesDTO.TeacherFeedbackDTO convertToFeedbackDTO(TeacherFeedbacksEntity entity) {
        String teacherName = entity.getTeacher() != null ? entity.getTeacher().getFirstName() : "";
        Long teacherId = entity.getTeacher() != null ? entity.getTeacher().getId() : null;
        Long submissionId = entity.getSubmission() != null ? entity.getSubmission().getId() : null;
        
        return new ExercisesDTO.TeacherFeedbackDTO(
            entity.getId(),
            entity.getComments(),
            entity.getScoreAdjustment(),
            entity.getGivenAt(),
            teacherId,
            teacherName,
            submissionId
        );
    }
}