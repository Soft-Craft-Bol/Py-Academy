package com.pyAcademy.pyAcademy.features.learning.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "material_views")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MaterialViewsEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    @Column(name = "progress_percentage")
    private Integer progressPercentage;

    @Column(name = "is_completed")
    private Boolean isCompleted;


}
