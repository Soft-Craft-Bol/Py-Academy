package com.pyAcademy.pyAcademy.features.simulations.domain.models;

import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import jakarta.persistence.*;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name = "simulations_sessions")
public class SimulationSessionsEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_state")
    private String codeState;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "last_updated")
    private Timestamp lastUpdated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "simulation_id") // FK en simulation_sessions
    private CodeSimulationsEntity simulation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private StudentEntity student;
}
