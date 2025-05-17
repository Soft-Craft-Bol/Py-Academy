package com.pyAcademy.pyAcademy.features.education.domain.models;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("STUDENT")
@Table(name = "students")
public class StudentEntity extends UserEntity {

    private String gradeLevel;
    private String studentNumber;

    // Constructor, getters y setters
    public String getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(String gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }
}
