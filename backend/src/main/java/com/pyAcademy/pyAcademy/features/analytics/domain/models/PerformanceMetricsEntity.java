package com.pyAcademy.pyAcademy.features.analytics.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.ExerciseSubmissionsEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Date;

@Entity
@Table(name = "performance_metrics")
public class PerformanceMetricsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @PastOrPresent
    private Date date;

    @Column(name = "exercises_attempted")
    @NotNull
    @Min(0)
    private Integer exercisesAttempted;

    @Column(name = "exercises_completed")
    @NotNull
    @Min(0)
    private Integer exercisesCompleted;

    @Column(name = "average_score")
    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double averageScore;

    @Column(name = "average_time_spent")
    @NotNull
    @Min(0)
    @Max(1440)
    private Integer timeSpentMinutes;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @NotNull
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    @NotNull
    private CourseEntity course;

    @OneToOne
    @JoinColumn(name = "exercise_id", referencedColumnName = "id")
    private ExerciseSubmissionsEntity entregas;

    // Método de validación personalizado para consistencia entre campos
    @AssertTrue(message = "exercisesCompleted cannot be greater than exercisesAttempted")
    private boolean isExercisesConsistent() {
        return exercisesCompleted <= exercisesAttempted;
    }

    @AssertTrue(message = "If no exercises attempted, average score should be 0")
    private boolean isScoreConsistent() {
        return exercisesAttempted != 0 || averageScore == 0;
    }
}