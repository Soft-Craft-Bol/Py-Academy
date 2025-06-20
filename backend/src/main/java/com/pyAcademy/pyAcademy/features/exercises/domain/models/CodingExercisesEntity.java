package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "coding_exercises")
public class CodingExercisesEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "starter_code")
    private String starterCode;

    @Column(name = "solution_code")
    private String solutionCode;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ExerciseSubmissionsEntity> submissions = new HashSet<>();

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCasesEntity> testCases = new HashSet<>();
}
