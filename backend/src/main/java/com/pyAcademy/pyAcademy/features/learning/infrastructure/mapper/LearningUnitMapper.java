package com.pyAcademy.pyAcademy.features.learning.infrastructure.mapper;

import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import com.pyAcademy.pyAcademy.features.exercises.domain.models.TestCasesEntity;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.response.ExerciseResponse;
import com.pyAcademy.pyAcademy.features.exercises.infrastructure.dto.response.TestCaseResponse;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.ContentResponse;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.TitleResponse;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.UnitResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class LearningUnitMapper {

    public List<UnitResponse> toUnitResponseList(List<LearningUnitsEntity> units) {
        return units.stream()
                .map(this::toUnitResponse)
                .collect(Collectors.toList());
    }

    public UnitResponse toUnitResponse(LearningUnitsEntity unit) {
        return UnitResponse.builder()
                .unitId(unit.getUnitId())
                .title(unit.getTitle())
                .description(unit.getDescription())
                .isActive(unit.getIsActive())
                .sequenceNumber(unit.getSequenceNumber())
                .courseId(unit.getCourseId())
                .titles(toTitleResponseList(unit.getTitles()))
                .exercises(toExerciseResponseList(unit.getExercises()))
                .build();
    }

    public List<ExerciseResponse> toExerciseResponseList(Set<CodingExercisesEntity> exercises) {
    if (exercises == null || exercises.isEmpty()) {
        return new ArrayList<>();
    }
    
    return exercises.stream()
            .sorted((e1, e2) -> e1.getSequenceNumber().compareTo(e2.getSequenceNumber()))
            .map(this::toExerciseResponse)
            .collect(Collectors.toList());
}

public ExerciseResponse toExerciseResponse(CodingExercisesEntity exercise) {
    return ExerciseResponse.builder()
            .id(exercise.getId())
            .title(exercise.getTitle())
            .description(exercise.getDescription())
            .starterCode(exercise.getStarterCode())
            .solutionCode(exercise.getSolutionCode())
            .language(exercise.getLanguage())
            .difficultyLevel(exercise.getDifficultyLevel())
            .sequenceNumber(exercise.getSequenceNumber())
            .isActive(exercise.getIsActive())
            .createdAt(exercise.getCreatedAt())
            .updatedAt(exercise.getUpdatedAt())
            .testCases(toTestCaseResponseList(exercise.getTestCases()))
            .build();
}

public List<TestCaseResponse> toTestCaseResponseList(Set<TestCasesEntity> testCases) {
    if (testCases == null || testCases.isEmpty()) {
        return new ArrayList<>();
    }
    
    return testCases.stream()
            .sorted((t1, t2) -> {
                if (t1.getWeight() != null && t2.getWeight() != null) {
                    return t1.getWeight().compareTo(t2.getWeight());
                }
                return t1.getId().compareTo(t2.getId());
            })
            .map(this::toTestCaseResponse)
            .collect(Collectors.toList());
}

public TestCaseResponse toTestCaseResponse(TestCasesEntity testCase) {
    return TestCaseResponse.builder()
            .id(testCase.getId())
            .input(testCase.getInputData())  // Cambio: input -> inputData
            .expectedOutput(testCase.getExpectedOutput())
            .description(null)  // No existe description en la nueva entidad
            .isHidden(testCase.getIsHidden())
            .sequenceNumber(testCase.getWeight())  // Cambio: sequenceNumber -> weight
            .isActive(null)  // No existe isActive en la nueva entidad
            .build();
}

    private List<TitleResponse> toTitleResponseList(Set<LearningTitleEntity> titles) {
        return titles.stream()
                .sorted((t1, t2) -> Integer.compare(t1.getSequenceNumber(), t2.getSequenceNumber()))
                .map(this::toTitleResponse)
                .collect(Collectors.toList());
    }

    private TitleResponse toTitleResponse(LearningTitleEntity title) {
        return TitleResponse.builder()
                .title(title.getTitle())
                .description(title.getDescription())
                .isActive(title.getIsActive())
                .sequenceNumber(title.getSequenceNumber())
                .contents(toContentResponseList(title.getContents()))
                .build();
    }

    private List<ContentResponse> toContentResponseList(Set<LearningContentEntity> contents) {
        return contents.stream()
                .map(this::toContentResponse)
                .collect(Collectors.toList());
    }

    private ContentResponse toContentResponse(LearningContentEntity content) {
        return ContentResponse.builder()
                .content(content.getContent())
                .build();
    }
}
