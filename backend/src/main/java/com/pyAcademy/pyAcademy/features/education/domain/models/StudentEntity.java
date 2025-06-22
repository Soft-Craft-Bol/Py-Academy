package com.pyAcademy.pyAcademy.features.education.domain.models;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.ExerciseSubmissionsEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("STUDENT")
@Getter
@Setter
@Table(name = "students")
public class StudentEntity extends UserEntity {


    @Column(name = "enrollment_number", unique = true)
    private String enrollmentNumber;

    @Column(name = "academic_program")
    private String academicProgram;

    private Integer semester;

    @Column(name = "progress_summary", columnDefinition = "TEXT")
    private String progressSummary;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ExerciseSubmissionsEntity> submissions = new HashSet<>();

    public StudentEntity(){}
}
