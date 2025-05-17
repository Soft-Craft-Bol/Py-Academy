package com.pyAcademy.pyAcademy.features.education.domain.models;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@DiscriminatorValue("TEACHER")
@Table(name = "teachers")
public class TeacherEntity extends UserEntity {

    private String department;
    private String specialization;

    // Constructor, getters y setters
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
