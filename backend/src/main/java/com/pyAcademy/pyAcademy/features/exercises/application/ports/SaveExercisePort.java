package com.pyAcademy.pyAcademy.features.exercises.application.ports;

import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;

public interface SaveExercisePort {
    CodingExercisesEntity save(CodingExercisesEntity exercise);
}