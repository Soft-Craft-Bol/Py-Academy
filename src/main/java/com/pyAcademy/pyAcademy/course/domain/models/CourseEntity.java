package com.pyAcademy.pyAcademy.course.domain.models;


import com.pyAcademy.pyAcademy.user.domain.models.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Entity
@Data
@Table(name = "course")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_docente", nullable = false)
    private UserEntity docente;

}
