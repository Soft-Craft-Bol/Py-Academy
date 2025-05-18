package com.pyAcademy.pyAcademy.features.exercises.domain.models;


import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;

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
    private Integer executionTimeMs;

    @Column(name = "memory_usage_kb")
    private Integer memoryUsageKb;

    private String status;// 'pending', 'success', 'failed'

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private CodingExercisesEntity exercise;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;
}
