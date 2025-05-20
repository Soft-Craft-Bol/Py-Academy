package com.pyAcademy.pyAcademy.features.learning.domain.models;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "learning_units")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LearningUnitsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unitId;

    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    private BigDecimal isActive;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @Column(name = "sequence_number", nullable = false)
    private int sequenceNumber;

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

    public void addPrerequisite(LearningUnitsEntity prerequisite) {
        this.prerequisites.add(prerequisite);
        prerequisite.getDependentUnits().add(this);
    }
}
