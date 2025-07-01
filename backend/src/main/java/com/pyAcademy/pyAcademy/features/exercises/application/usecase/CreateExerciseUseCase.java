package com.pyAcademy.pyAcademy.features.exercises.application.usecase;

import com.pyAcademy.pyAcademy.features.learning.domain.ports.LoadLearningUnitPort;
import com.pyAcademy.pyAcademy.features.exercises.application.ports.SaveExercisePort;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.TestCasesEntity;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.CreateExerciseRequest;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.TestCaseRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Service
public class CreateExerciseUseCase {

    private final SaveExercisePort saveExercisePort;
    private final LoadLearningUnitPort loadLearningUnitPort;

    public CreateExerciseUseCase(SaveExercisePort saveExercisePort, LoadLearningUnitPort loadLearningUnitPort) {
        this.saveExercisePort = saveExercisePort;
        this.loadLearningUnitPort = loadLearningUnitPort;
    }

    public CodingExercisesEntity create(CreateExerciseRequest request) {
        CodingExercisesEntity entity = new CodingExercisesEntity();
        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setStarterCode(request.starterCode());
        entity.setSolutionCode(request.solutionCode());
        entity.setLanguage(request.language());
        entity.setDifficultyLevel(request.difficultyLevel());
        entity.setSequenceNumber(request.sequenceNumber());
        entity.setIsActive(true);
        entity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        // ✅ Relacionar con unidad
        if (request.unitId() != null) {
            var unit = loadLearningUnitPort.findById(request.unitId())
                .orElseThrow(() -> new RuntimeException("Unidad no encontrada con ID: " + request.unitId()));
            entity.setUnit(unit);
        }

        // ✅ Test cases
        if (request.testCases() != null && !request.testCases().isEmpty()) {
            Set<TestCasesEntity> testCases = new HashSet<>();
            for (TestCaseRequest tcReq : request.testCases()) {
                TestCasesEntity testCase = new TestCasesEntity();
                testCase.setInputData(tcReq.inputData());
                testCase.setExpectedOutput(tcReq.expectedOutput());
                testCase.setIsHidden(tcReq.isHidden() != null && tcReq.isHidden() ? BigDecimal.ONE : BigDecimal.ZERO);
                testCase.setWeight(tcReq.weight());
                testCase.setExercise(entity);
                testCases.add(testCase);
            }
            entity.setTestCases(testCases);
        }

        return saveExercisePort.save(entity);
    }
}
