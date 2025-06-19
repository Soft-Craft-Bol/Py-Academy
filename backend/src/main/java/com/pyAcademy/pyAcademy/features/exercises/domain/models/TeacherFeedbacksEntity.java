package com.pyAcademy.pyAcademy.features.exercises.domain.models;


import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import jakarta.persistence.*;

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
    private Double scoreAdjustment;

    @Column(name = "given_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp givenAt;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private ExerciseSubmissionsEntity submission;
}
