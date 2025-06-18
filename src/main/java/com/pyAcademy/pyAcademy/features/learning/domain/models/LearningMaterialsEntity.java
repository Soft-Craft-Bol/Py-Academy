package com.pyAcademy.pyAcademy.features.learning.domain.models;

import com.pyAcademy.pyAcademy.features.learning.domain.enums.MaterialType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;


@Entity
@Table(name = "learning_materials")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LearningMaterialsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    private String title;
    private String description;
    private String url; //Materiales como pdf, video,  presentacion, link
    
    @Column(name = "material_type")
    private MaterialType materialType; // 'video', 'pdf', 'presentation', 'link'

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "is_mandatory")
    private Boolean isMandatory; // true or false

    @Column(name = "sequence_number")
    private Integer sequenceNumber; // 1, 2, 3, etc.

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private LearningUnitsEntity unit;



}
