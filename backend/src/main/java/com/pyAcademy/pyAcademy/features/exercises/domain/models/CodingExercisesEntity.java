package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "coding_exercises")
public class CodingExercisesEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "starter_code")
    private String starterCode;

    @Column(name = "solution_code")
    private String solutionCode;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ExerciseSubmissionsEntity> submissions = new HashSet<>();

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCasesEntity> testCases = new HashSet<>();

    // Constructor por defecto
    public CodingExercisesEntity() {}

    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getStarterCode() {
        return starterCode;
    }
    
    public void setStarterCode(String starterCode) {
        this.starterCode = starterCode;
    }
    
    public String getSolutionCode() {
        return solutionCode;
    }
    
    public void setSolutionCode(String solutionCode) {
        this.solutionCode = solutionCode;
    }
    
    public String getLanguage() {
        return language;
    }
    
    public void setLanguage(String language) {
        this.language = language;
    }
    
    public String getDifficultyLevel() {
        return difficultyLevel;
    }
    
    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    
    public Integer getSequenceNumber() {
        return sequenceNumber;
    }
    
    public void setSequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Set<ExerciseSubmissionsEntity> getSubmissions() {
        return submissions;
    }
    
    public void setSubmissions(Set<ExerciseSubmissionsEntity> submissions) {
        this.submissions = submissions;
    }
    
    // Método para obtener testCases como List (usado en tu método de conversión)
    public List<TestCasesEntity> getTestCases() {
        return new ArrayList<>(testCases);
    }
    
    // Método para obtener testCases como Set (para consistencia con JPA)
    public Set<TestCasesEntity> getTestCasesSet() {
        return testCases;
    }
    
    public void setTestCases(Set<TestCasesEntity> testCases) {
        this.testCases = testCases;
    }
    
    // Método auxiliar para agregar un test case
    public void addTestCase(TestCasesEntity testCase) {
        testCases.add(testCase);
        testCase.setExercise(this);
    }
    
    // Método auxiliar para remover un test case
    public void removeTestCase(TestCasesEntity testCase) {
        testCases.remove(testCase);
        testCase.setExercise(null);
    }
    
    // Método auxiliar para agregar una submission
    public void addSubmission(ExerciseSubmissionsEntity submission) {
        submissions.add(submission);
        submission.setExercise(this);
    }
    
    // Método auxiliar para remover una submission
    public void removeSubmission(ExerciseSubmissionsEntity submission) {
        submissions.remove(submission);
        submission.setExercise(null);
    }
}