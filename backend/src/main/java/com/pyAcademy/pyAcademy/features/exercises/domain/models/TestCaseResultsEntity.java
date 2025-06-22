package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;

@Entity
@Table(name = "test_case_results")
public class TestCaseResultsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "actual_output")
    private String actualOutput;

    @Column(name = "is_passed")
    private Boolean isPassed;

    @Column(name = "execution_time_ms")
    private Integer executionTimeMs;

    @Column(name = "error_message")
    private String errorMessage;

    @ManyToOne
    @JoinColumn(name = "test_case_id", nullable = false)
    private TestCasesEntity testCase;

    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private ExerciseSubmissionsEntity submission;

    public TestCaseResultsEntity() {}

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

    public TestCasesEntity getTestCase() { return testCase; }
    public void setTestCase(TestCasesEntity testCase) { this.testCase = testCase; }

    public ExerciseSubmissionsEntity getSubmission() { return submission; }
    public void setSubmission(ExerciseSubmissionsEntity submission) { this.submission = submission; }
}
