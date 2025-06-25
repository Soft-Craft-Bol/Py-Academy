package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "exercise_submissions")
public class ExerciseSubmissionsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String language;

    @Column(name = "submission_time")
    private Timestamp submissionTime;

    @Column(name = "execution_time_ms")
    private Long executionTimeMs; // Cambiado de Integer a Long

    @Column(name = "memory_usage_kb")
    private Long memoryUsageKb; // Cambiado de Integer a Long

    private String status; // 'pending', 'success', 'failed'

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private CodingExercisesEntity exercise;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TeacherFeedbacksEntity> feedbacks = new HashSet<>();

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCaseResultsEntity> testCaseResults = new HashSet<>();

    // Constructor por defecto
    public ExerciseSubmissionsEntity() {}

    // Getters y Setters
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getCode() { 
        return code; 
    }
    
    public void setCode(String code) { 
        this.code = code; 
    }

    public String getLanguage() { 
        return language; 
    }
    
    public void setLanguage(String language) { 
        this.language = language; 
    }

    public Timestamp getSubmissionTime() { 
        return submissionTime; 
    }
    
    public void setSubmissionTime(Timestamp submissionTime) { 
        this.submissionTime = submissionTime; 
    }

    public Long getExecutionTimeMs() { 
        return executionTimeMs; 
    }
    
    public void setExecutionTimeMs(Long executionTimeMs) { 
        this.executionTimeMs = executionTimeMs; 
    }

    public Long getMemoryUsageKb() { 
        return memoryUsageKb; 
    }
    
    public void setMemoryUsageKb(Long memoryUsageKb) { 
        this.memoryUsageKb = memoryUsageKb; 
    }

    public String getStatus() { 
        return status; 
    }
    
    public void setStatus(String status) { 
        this.status = status; 
    }

    public CodingExercisesEntity getExercise() { 
        return exercise; 
    }
    
    public void setExercise(CodingExercisesEntity exercise) { 
        this.exercise = exercise; 
    }

    public StudentEntity getStudent() { 
        return student; 
    }
    
    public void setStudent(StudentEntity student) { 
        this.student = student; 
    }

    public Set<TeacherFeedbacksEntity> getFeedbacks() { 
        return feedbacks; 
    }
    
    public void setFeedbacks(Set<TeacherFeedbacksEntity> feedbacks) { 
        this.feedbacks = feedbacks; 
    }

    // Método para obtener testCaseResults como Set (consistente con JPA)
    public Set<TestCaseResultsEntity> getTestCaseResults() { 
        return testCaseResults; 
    }
    
    public void setTestCaseResults(Set<TestCaseResultsEntity> testCaseResults) { 
        this.testCaseResults = testCaseResults; 
    }

    // Método para obtener testCaseResults como List (usado en el método de conversión)
    public List<TestCaseResultsEntity> getTestCaseResultsList() {
        return new ArrayList<>(testCaseResults);
    }

    // Métodos auxiliares para manejar relaciones bidireccionales
    public void addFeedback(TeacherFeedbacksEntity feedback) {
        feedbacks.add(feedback);
        feedback.setSubmission(this);
    }

    public void removeFeedback(TeacherFeedbacksEntity feedback) {
        feedbacks.remove(feedback);
        feedback.setSubmission(null);
    }

    public void addTestCaseResult(TestCaseResultsEntity testCaseResult) {
        testCaseResults.add(testCaseResult);
        testCaseResult.setSubmission(this);
    }

    public void removeTestCaseResult(TestCaseResultsEntity testCaseResult) {
        testCaseResults.remove(testCaseResult);
        testCaseResult.setSubmission(null);
    }
}