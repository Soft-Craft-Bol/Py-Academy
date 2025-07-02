package com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter;

import com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa.CodingExercisesRepository;
import com.pyAcademy.pyAcademy.features.exercises.application.ports.SaveExercisePort;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import org.springframework.stereotype.Component;

@Component
public class CodingExerciseJpaAdapter implements SaveExercisePort {

    private final CodingExercisesRepository repository;

    public CodingExerciseJpaAdapter(CodingExercisesRepository repository) {
        this.repository = repository;
    }

    @Override
    public CodingExercisesEntity save(CodingExercisesEntity exercise) {
        return repository.save(exercise);
    }
}