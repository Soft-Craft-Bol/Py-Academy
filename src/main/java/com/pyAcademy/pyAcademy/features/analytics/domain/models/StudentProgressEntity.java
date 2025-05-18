package com.pyAcademy.pyAcademy.features.analytics.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;

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
    private BigDecimal completionPercentage;

    @Column(name = "is_completed" , nullable = false)
    private Boolean isCompleted;

    @Column(name = "last_accessed")
    private Timestamp lastAccessed;

    @Column(name = "completed_at")
    private Timestamp completedAt;

    @OneToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private StudentEntity student;


}
