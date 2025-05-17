package com.pyAcademy.pyAcademy.features.learning.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "learning_units")
public class LearningUnitsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unitId;

    @Column(name = "sequence_number", nullable = false)
    private int sequenceNumber;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LearningMaterialsEntity> materials = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "unit_prerequisites",
            joinColumns = @JoinColumn(name = "unit_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_id")
    )
    private Set<LearningUnitsEntity> prerequisites = new HashSet<>();

    @ManyToMany(mappedBy = "prerequisites")
    private Set<LearningUnitsEntity> dependentUnits = new HashSet<>();

    // Constructores, getters y setters

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public int getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(int sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }


    public Set<LearningUnitsEntity> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(Set<LearningUnitsEntity> prerequisites) {
        this.prerequisites = prerequisites;
    }

    public Set<LearningUnitsEntity> getDependentUnits() {
        return dependentUnits;
    }

    public void setDependentUnits(Set<LearningUnitsEntity> dependentUnits) {
        this.dependentUnits = dependentUnits;
    }

    // Métodos utilitarios para manejar los prerrequisitos

    public void addPrerequisite(LearningUnitsEntity prerequisite) {
        this.prerequisites.add(prerequisite);
        prerequisite.getDependentUnits().add(this);
    }

    public void removePrerequisite(LearningUnitsEntity prerequisite) {
        this.prerequisites.remove(prerequisite);
        prerequisite.getDependentUnits().remove(this);
    }
}
