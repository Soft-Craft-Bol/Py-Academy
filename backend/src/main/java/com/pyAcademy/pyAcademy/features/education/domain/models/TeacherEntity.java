package com.pyAcademy.pyAcademy.features.education.domain.models;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("TEACHER")
@Getter
@Setter
@Table(name = "teachers")
public class TeacherEntity extends UserEntity {

    private String department;
    private String specialization;

    @Column(name = "academic_degree")
    private String academicDegree;

}
