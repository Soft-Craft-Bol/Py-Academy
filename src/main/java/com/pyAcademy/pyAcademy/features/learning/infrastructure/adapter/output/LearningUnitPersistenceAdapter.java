package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output;

import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningUnitOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction.LearningUnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningUnitPersistenceAdapter implements LearningUnitOutputPort {

    private final LearningUnitRepository learningUnitRepository;

    @Override
    public LearningUnit save(LearningUnit unit) {
        return learningUnitRepository.save(unit);
    }

    @Override
    public Optional<LearningUnit> findById(Long id) {
        return learningUnitRepository.findById(id);
    }

    @Override
    public List<LearningUnit> findByCourseId(Long courseId) {
        return learningUnitRepository.findByCourseId(courseId);
    }

    @Override
    public void deleteById(Long id) {
        learningUnitRepository.deleteById(id);
    }

    @Override
    public LearningUnit update(LearningUnit unit) {
        return learningUnitRepository.update(unit);
    }

    @Override
    public void addPrerequisite(Long unitId, Long prerequisiteId) {
        learningUnitRepository.addPrerequisite(unitId, prerequisiteId);
    }
}