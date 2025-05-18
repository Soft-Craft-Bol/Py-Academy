package com.pyAcademy.pyAcademy.features.course.domain.models;

import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "course_teachers")
public class CourseTeacherEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @Column(name = "assigned_date", nullable = false)
    private Timestamp assignedDate;

    @Column(name = "role", nullable = false)
    private String role;


}
