package com.pyAcademy.pyAcademy.features.exercises.application.usecase;

import com.pyAcademy.pyAcademy.features.exercises.application.ports.SaveExercisePort;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.CreateExerciseRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CreateExerciseUseCase {

    private final SaveExercisePort saveExercisePort;
//jaja
    public CreateExerciseUseCase(SaveExercisePort saveExercisePort) {
        this.saveExercisePort = saveExercisePort;
    }

    public CodingExercisesEntity create(CreateExerciseRequest request) {
        CodingExercisesEntity entity = new CodingExercisesEntity();
        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setStarterCode(request.starterCode());
        entity.setSolutionCode(request.solutionCod());
        entity.setLanguage(request.language());
        entity.setDifficultyLevel(request.difficultyLevel());
        entity.setSequenceNumber(request.sequenceNumber());
        entity.setIsActive(true);
        entity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return saveExercisePort.save(entity);
    }
}
