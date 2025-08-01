package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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


}
