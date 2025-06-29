package com.pyAcademy.pyAcademy.features.course.domain.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "courses")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(nullable = false)
    private String description;

    @NotNull(message = "La duración es obligatoria")
    @Min(value = 1, message = "La duración debe ser al menos 1 hora")
    @Column(nullable = false)
    private Integer durationInHours;

    @NotBlank(message = "El nivel es obligatorio")
    @Column(nullable = false)
    private String level;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    @Column(nullable = false)
    private Double price;

    @Column(name = "image_url")
    private String imageUrl;

//    @NotBlank(message = "El instructor es obligatorio")
//    @Column(nullable = false)
//    private String instructor;

    @NotNull(message = "La fecha de inicio es obligatoria")
    @Column(nullable = false)
    private LocalDate startDate;

    @NotNull(message = "La fecha de fin es obligatoria")
    @Column(nullable = false)
    private LocalDate endDate;

    @NotNull(message = "El número máximo de estudiantes es obligatorio")
    @Min(value = 1, message = "Debe haber al menos 1 estudiante")
    @Column(nullable = false)
    private Integer maxStudents;

    @Column(nullable = false)
    private boolean isActive;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseEnrollmentsEntity> courseEnrollments = new HashSet<>();

    public CourseEntity(Long courseId) {
        this.id = courseId;
    }

    public CourseEntity() {

    }
}