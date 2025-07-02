package com.pyAcademy.pyAcademy.features.exercises.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "test_cases")
public class TestCasesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "input_data", columnDefinition = "TEXT")
    private String inputData;

    @Column(name = "expected_output", columnDefinition = "TEXT")
    private String expectedOutput;

    @Column(name = "is_hidden")
    private BigDecimal isHidden;

    @Column(name = "weight")
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private CodingExercisesEntity exercise;

    @OneToMany(mappedBy = "testCase", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCaseResultsEntity> results = new HashSet<>();


}