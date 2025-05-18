package com.pyAcademy.pyAcademy.features.simulations.domain.models;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "code_simulations")
public class CodeSimulationsEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "initial_code", columnDefinition = "TEXT")
    private String initialCode;

    @Column(name = "visualization_type")
    private String visualizationType; // 'memory', 'flow', 'data_structure'

    @Column(name = "config_json", columnDefinition = "JSONB")
    private String configJson;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @OneToMany(mappedBy = "simulation", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SimulationSessionsEntity> sessions = new HashSet<>();
}
