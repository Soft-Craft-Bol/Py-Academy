package com.pyAcademy.pyAcademy.features.exercises.application.usecase;

import com.pyAcademy.pyAcademy.features.exercises.application.ports.SaveExercisePort;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.TestCasesEntity;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.CreateExerciseRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;

import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.request.TestCaseRequest;

import java.util.Set;

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
    entity.setSolutionCode(request.solutionCode());
    entity.setLanguage(request.language());
    entity.setDifficultyLevel(request.difficultyLevel());
    entity.setSequenceNumber(request.sequenceNumber());
    entity.setIsActive(true);
    entity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
    entity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

    if (request.testCases() != null && !request.testCases().isEmpty()) {
        Set<TestCasesEntity> testCases = new HashSet<>();
        for (TestCaseRequest tcReq : request.testCases()) {  // Usa testCases() que es del record
            TestCasesEntity testCase = new TestCasesEntity();
            testCase.setInputData(tcReq.inputData());        // Usa método del record
            testCase.setExpectedOutput(tcReq.expectedOutput());
            testCase.setIsHidden(tcReq.isHidden() != null && tcReq.isHidden() ? BigDecimal.ONE : BigDecimal.ZERO);
            testCase.setWeight(tcReq.weight());
            testCase.setExercise(entity);
            testCases.add(testCase);                          // Agrega a testCases local
        }
        entity.setTestCases(testCases);                        // Setea en la entidad el set construido
    }

    return saveExercisePort.save(entity);
}

}
