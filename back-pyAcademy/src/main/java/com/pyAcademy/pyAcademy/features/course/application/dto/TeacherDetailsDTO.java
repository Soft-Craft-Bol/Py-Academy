package com.pyAcademy.pyAcademy.features.course.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDetailsDTO {
    private String firstName;
    private String lastName;
    private String email;
    private Long telefono;
    private String photo;

    public TeacherDetailsDTO(String firstName, String lastName, String email, Long telefono, String photo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telefono = telefono;
        this.photo = photo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }


}