package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test_cases")
public class TestCasesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "input_data", columnDefinition = "TEXT")
    private String inputData;

    @Column(name = "expected_output", columnDefinition = "TEXT")
    private String expectedOutput;

    @Column(name = "is_hidden")
    private BigDecimal isHidden;

    @Column(name = "weight")
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private CodingExercisesEntity exercise;

    @OneToMany(mappedBy = "testCase", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCaseResultsEntity> results = new HashSet<>();

    // Constructor por defecto
    public TestCasesEntity() {}

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInputData() {
        return inputData;
    }

    public void setInputData(String inputData) {
        this.inputData = inputData;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public BigDecimal getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(BigDecimal isHidden) {
        this.isHidden = isHidden;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public CodingExercisesEntity getExercise() {
        return exercise;
    }

    public void setExercise(CodingExercisesEntity exercise) {
        this.exercise = exercise;
    }

    public Set<TestCaseResultsEntity> getResults() {
        return results;
    }

    public void setResults(Set<TestCaseResultsEntity> results) {
        this.results = results;
    }

    // Métodos auxiliares para manejar la relación bidireccional
    public void addResult(TestCaseResultsEntity result) {
        results.add(result);
        result.setTestCase(this);
    }

    public void removeResult(TestCaseResultsEntity result) {
        results.remove(result);
        result.setTestCase(null);
    }
}