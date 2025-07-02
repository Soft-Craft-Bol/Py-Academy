package com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class ExercisesDTO {
    
    public static class CodingExerciseDTO {
        private Long id;
        private String title;
        private String description;
        private String starterCode;
        private String language;
        private String difficultyLevel;
        private Integer sequenceNumber;
        private Boolean isActive;
        private Timestamp createdAt;
        private List<TestCaseDTO> testCases;
        
        public CodingExerciseDTO() {}
        
        public CodingExerciseDTO(Long id, String title, String description, String starterCode, 
                                String language, String difficultyLevel, Integer sequenceNumber, 
                                Boolean isActive, Timestamp createdAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.starterCode = starterCode;
            this.language = language;
            this.difficultyLevel = difficultyLevel;
            this.sequenceNumber = sequenceNumber;
            this.isActive = isActive;
            this.createdAt = createdAt;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getStarterCode() { return starterCode; }
        public void setStarterCode(String starterCode) { this.starterCode = starterCode; }
        
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
        
        public String getDifficultyLevel() { return difficultyLevel; }
        public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
        
        public Integer getSequenceNumber() { return sequenceNumber; }
        public void setSequenceNumber(Integer sequenceNumber) { this.sequenceNumber = sequenceNumber; }
        
        public Boolean getIsActive() { return isActive; }
        public void setIsActive(Boolean isActive) { this.isActive = isActive; }
        
        public Timestamp getCreatedAt() { return createdAt; }
        public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
        
        public List<TestCaseDTO> getTestCases() { return testCases; }
        public void setTestCases(List<TestCaseDTO> testCases) { this.testCases = testCases; }
    }
    
    public static class SubmissionDTO {
        private Long id;
        private String code;
        private String language;
        private Timestamp submissionTime;
        private Long executionTimeMs;
        private Long memoryUsageKb;
        private String status;
        private Long exerciseId;
        private Long studentId;
        private String exerciseTitle;
        private String studentName;
        private List<TestCaseResultDTO> testResults;
        
        // Constructors
        public SubmissionDTO() {}
        
        public SubmissionDTO(Long id, String code, String language, Timestamp submissionTime,
                            Long executionTimeMs, Long memoryUsageKb, String status,
                            Long exerciseId, Long studentId, String exerciseTitle, String studentName) {
            this.id = id;
            this.code = code;
            this.language = language;
            this.submissionTime = submissionTime;
            this.executionTimeMs = executionTimeMs;
            this.memoryUsageKb = memoryUsageKb;
            this.status = status;
            this.exerciseId = exerciseId;
            this.studentId = studentId;
            this.exerciseTitle = exerciseTitle;
            this.studentName = studentName;
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
        
        public Timestamp getSubmissionTime() { return submissionTime; }
        public void setSubmissionTime(Timestamp submissionTime) { this.submissionTime = submissionTime; }
        
        public Long getExecutionTimeMs() { return executionTimeMs; }
        public void setExecutionTimeMs(Long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
        
        public Long getMemoryUsageKb() { return memoryUsageKb; }
        public void setMemoryUsageKb(Long memoryUsageKb) { this.memoryUsageKb = memoryUsageKb; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public Long getExerciseId() { return exerciseId; }
        public void setExerciseId(Long exerciseId) { this.exerciseId = exerciseId; }
        
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public String getExerciseTitle() { return exerciseTitle; }
        public void setExerciseTitle(String exerciseTitle) { this.exerciseTitle = exerciseTitle; }
        
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        
        public List<TestCaseResultDTO> getTestResults() { return testResults; }
        public void setTestResults(List<TestCaseResultDTO> testResults) { this.testResults = testResults; }
    }
    
    // TestCaseDTO
    public static class TestCaseDTO {
        private Long id;
        private String inputData;
        private String expectedOutput;
        private Boolean isHidden;
        private Integer weight;
        
        // Constructors
        public TestCaseDTO() {}
        
        public TestCaseDTO(Long id, String inputData, String expectedOutput, Boolean isHidden, Integer weight) {
            this.id = id;
            this.inputData = inputData;
            this.expectedOutput = expectedOutput;
            this.isHidden = isHidden;
            this.weight = weight;
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getInputData() { return inputData; }
        public void setInputData(String inputData) { this.inputData = inputData; }
        
        public String getExpectedOutput() { return expectedOutput; }
        public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }
        
        public Boolean getIsHidden() { return isHidden; }
        public void setIsHidden(Boolean isHidden) { this.isHidden = isHidden; }
        
        public Integer getWeight() { return weight; }
        public void setWeight(Integer weight) { this.weight = weight; }
    }
    
    public static class TestCaseResultDTO {
        private Long id;
        private String actualOutput;
        private Boolean isPassed;
        private Integer executionTimeMs;
        private String errorMessage;
        private Long testCaseId;
        private String inputData;
        private String expectedOutput;
        
        // Constructors
        public TestCaseResultDTO() {}
        
        public TestCaseResultDTO(Long id, String actualOutput, Boolean isPassed, Integer executionTimeMs,
                                String errorMessage, Long testCaseId, String inputData, String expectedOutput) {
            this.id = id;
            this.actualOutput = actualOutput;
            this.isPassed = isPassed;
            this.executionTimeMs = executionTimeMs;
            this.errorMessage = errorMessage;
            this.testCaseId = testCaseId;
            this.inputData = inputData;
            this.expectedOutput = expectedOutput;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getActualOutput() { return actualOutput; }
        public void setActualOutput(String actualOutput) { this.actualOutput = actualOutput; }
        
        public Boolean getIsPassed() { return isPassed; }
        public void setIsPassed(Boolean isPassed) { this.isPassed = isPassed; }
        
        public Integer getExecutionTimeMs() { return executionTimeMs; }
        public void setExecutionTimeMs(Integer executionTimeMs) { this.executionTimeMs = executionTimeMs; }
        
        public String getErrorMessage() { return errorMessage; }
        public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
        
        public Long getTestCaseId() { return testCaseId; }
        public void setTestCaseId(Long testCaseId) { this.testCaseId = testCaseId; }
        
        public String getInputData() { return inputData; }
        public void setInputData(String inputData) { this.inputData = inputData; }
        
        public String getExpectedOutput() { return expectedOutput; }
        public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }
    }
    
    public static class TeacherFeedbackDTO {
        private Long id;
        private String comments;
        private BigDecimal scoreAdjustment;
        private Timestamp givenAt;
        private Long teacherId;
        private String teacherName;
        private Long submissionId;
        
        public TeacherFeedbackDTO() {}
        
        public TeacherFeedbackDTO(Long id, String comments, BigDecimal scoreAdjustment, Timestamp givenAt,
                                 Long teacherId, String teacherName, Long submissionId) {
            this.id = id;
            this.comments = comments;
            this.scoreAdjustment = scoreAdjustment;
            this.givenAt = givenAt;
            this.teacherId = teacherId;
            this.teacherName = teacherName;
            this.submissionId = submissionId;
        }
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getComments() { return comments; }
        public void setComments(String comments) { this.comments = comments; }
        
        public BigDecimal getScoreAdjustment() { return scoreAdjustment; }
        public void setScoreAdjustment(BigDecimal scoreAdjustment) { this.scoreAdjustment = scoreAdjustment; }
        
        public Timestamp getGivenAt() { return givenAt; }
        public void setGivenAt(Timestamp givenAt) { this.givenAt = givenAt; }
        
        public Long getTeacherId() { return teacherId; }
        public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }
        
        public String getTeacherName() { return teacherName; }
        public void setTeacherName(String teacherName) { this.teacherName = teacherName; }
        
        public Long getSubmissionId() { return submissionId; }
        public void setSubmissionId(Long submissionId) { this.submissionId = submissionId; }
    }
}
