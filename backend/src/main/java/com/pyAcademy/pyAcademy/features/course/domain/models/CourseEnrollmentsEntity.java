package com.pyAcademy.pyAcademy.features.course.domain.models;


import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "course_enrollments")
public class CourseEnrollmentsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enrollment_date")
    private Timestamp enrollmentDate;

    @Column(name = "completion_status")
    private String completionStatus;

    @Column(name = "completion_date")
    private Timestamp completionDate;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;
}
