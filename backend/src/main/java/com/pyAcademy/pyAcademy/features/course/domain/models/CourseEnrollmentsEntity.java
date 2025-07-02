package com.pyAcademy.pyAcademy.features.course.domain.models;


import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course_enrollments")
public class CourseEnrollmentsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate enrollmentDate = LocalDate.now();

    private String status = "INSCRITO"; // INSCRITO, RETIRADO, COMPLETADO

    private String completionStatus;

    private Timestamp completionDate;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    public CourseEnrollmentsEntity(StudentEntity student, CourseEntity course) {
        this.student = student;
        this.course = course;
        this.enrollmentDate = LocalDate.now();
        this.status = "INSCRITO";
    }
}
