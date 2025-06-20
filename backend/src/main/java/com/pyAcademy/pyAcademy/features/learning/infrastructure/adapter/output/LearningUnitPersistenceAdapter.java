package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output;

import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningUnitOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningUnitJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningUnitPersistenceAdapter implements LearningUnitOutputPort {

    private final LearningUnitJpaRepository learningUnitRepository;

    @Override
    public LearningUnitsEntity save(LearningUnitsEntity unit) {
        return learningUnitRepository.save(unit);
    }

    @Override
    public Optional<LearningUnitsEntity> findById(Long id) {
        return learningUnitRepository.findById(id);
    }

    @Override
    public List<LearningUnitsEntity> findByCourseId(Long courseId) {
        return learningUnitRepository.findByCourseId(courseId);
    }

    @Override
    public void deleteById(Long id) {
        learningUnitRepository.deleteById(id);
    }

    @Override
    public void addPrerequisite(Long unitId, Long prerequisiteId) {
        learningUnitRepository.addPrerequisite(unitId, prerequisiteId);
    }
}