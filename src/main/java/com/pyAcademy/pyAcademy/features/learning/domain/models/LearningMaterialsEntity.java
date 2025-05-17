package com.pyAcademy.pyAcademy.features.learning.domain.models;

import jakarta.persistence.*;

@Entity
@Table(name = "learning_materials")
public class LearningMaterialsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    private String title;
    private String description;
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id", nullable = false)
    private LearningUnitsEntity unit;

    // Constructores, getters y setters

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LearningUnitsEntity getUnit() {
        return unit;
    }

    public void setUnit(LearningUnitsEntity unit) {
        this.unit = unit;
    }
}
