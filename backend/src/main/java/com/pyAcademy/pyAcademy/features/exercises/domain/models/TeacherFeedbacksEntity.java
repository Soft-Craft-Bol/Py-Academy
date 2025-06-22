package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "teacher_feedbacks")
public class TeacherFeedbacksEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comments", columnDefinition = "TEXT", nullable = false)
    private String comments;

    @Column(name = "score_adjustment")
    private BigDecimal scoreAdjustment; // Cambiado de Double a BigDecimal

    @Column(name = "given_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp givenAt;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private ExerciseSubmissionsEntity submission;

    // Constructor por defecto
    public TeacherFeedbacksEntity() {}

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public BigDecimal getScoreAdjustment() {
        return scoreAdjustment;
    }

    public void setScoreAdjustment(BigDecimal scoreAdjustment) {
        this.scoreAdjustment = scoreAdjustment;
    }

    public Timestamp getGivenAt() {
        return givenAt;
    }

    public void setGivenAt(Timestamp givenAt) {
        this.givenAt = givenAt;
    }

    public TeacherEntity getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherEntity teacher) {
        this.teacher = teacher;
    }

    public ExerciseSubmissionsEntity getSubmission() {
        return submission;
    }

    public void setSubmission(ExerciseSubmissionsEntity submission) {
        this.submission = submission;
    }
}