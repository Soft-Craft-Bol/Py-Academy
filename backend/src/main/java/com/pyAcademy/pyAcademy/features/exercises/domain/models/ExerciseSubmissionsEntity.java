package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    private Long executionTimeMs;

    @Column(name = "memory_usage_kb")
    private Long memoryUsageKb;

    private String status;

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
}