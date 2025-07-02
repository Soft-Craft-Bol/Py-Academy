package com.pyAcademy.pyAcademy.features.analytics.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student_progress")
public class StudentProgressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "completion_percentage", nullable = false)
    @NotNull
    @DecimalMin("0.00")
    @DecimalMax("100.00")
    @Digits(integer = 3, fraction = 2)
    private BigDecimal completionPercentage;

    @Column(name = "is_completed", nullable = false)
    @NotNull
    private Boolean isCompleted;

    @Column(name = "last_accessed")
    @PastOrPresent
    private Timestamp lastAccessed;

    @Column(name = "completed_at")
    @PastOrPresent
    private Timestamp completedAt;

    @OneToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @NotNull
    private StudentEntity student;

    // Validaciones lógicas personalizadas
    @AssertTrue(message = "Completion percentage must be 100 when completed")
    private boolean isCompletionPercentageValid() {
        return !isCompleted || completionPercentage.compareTo(new BigDecimal("100.00")) == 0;
    }

    @AssertTrue(message = "Completed date can only exist when progress is completed")
    private boolean isCompletedAtValid() {
        return !isCompleted || completedAt != null;
    }

    @AssertTrue(message = "Completed date must be after or equal to last accessed date")
    private boolean isTimelineValid() {
        if (completedAt == null || lastAccessed == null) return true;
        return !completedAt.before(lastAccessed);
    }
}