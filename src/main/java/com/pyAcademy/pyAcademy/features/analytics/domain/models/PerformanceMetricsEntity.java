package com.pyAcademy.pyAcademy.features.analytics.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.ExerciseSubmissionsEntity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "performance_metrics")
public class PerformanceMetricsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;

    @Column(name  = "exercises_attempted")
    private Integer exercisesAttempted;

    @Column(name  = "exercises_completed")
    private Integer exercisesCompleted;

    @Column(name  = "average_score")
    private Double averageScore;

    @Column(name  = "average_time_spent")
    private Integer timeSpentMinutes;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private CourseEntity course;

    @OneToOne
    @JoinColumn(name = "exercise_id", referencedColumnName = "id")
    private ExerciseSubmissionsEntity entregas;
}
