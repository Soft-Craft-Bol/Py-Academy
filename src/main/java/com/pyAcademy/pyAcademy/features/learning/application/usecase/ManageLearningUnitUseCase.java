// ManageLearningUnitUseCase.java
package com.pyAcademy.pyAcademy.features.learning.application.usecase;

import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningUnitInputPort;
import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningUnitOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.exception.UnitNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageLearningUnitUseCase implements LearningUnitInputPort {

    private final LearningUnitOutputPort learningUnitOutputPort;

    @Override
    public LearningUnit createUnit(LearningUnit unit) {
        validateUnit(unit);
        unit.setCreatedAt(LocalDateTime.now());
        unit.setUpdatedAt(LocalDateTime.now());
        return learningUnitOutputPort.save(unit);
    }

    @Override
    public LearningUnit updateUnit(LearningUnit unit) {
        LearningUnit existing = getUnitById(unit.getUnitId());
        validateUnit(unit);

        existing.setTitle(unit.getTitle());
        existing.setDescription(unit.getDescription());
        existing.setIsActive(unit.getIsActive());
        existing.setSequenceNumber(unit.getSequenceNumber());
        existing.setUpdatedAt(LocalDateTime.now());

        return learningUnitOutputPort.update(existing);
    }

    @Override
    public void deleteUnit(Long unitId) {
        learningUnitOutputPort.deleteById(unitId);
    }

    @Override
    public LearningUnit getUnitById(Long unitId) {
        return learningUnitOutputPort.findById(unitId)
                .orElseThrow(() -> new UnitNotFoundException(unitId));
    }

    @Override
    public List<LearningUnit> getUnitsByCourseId(Long courseId) {
        return learningUnitOutputPort.findByCourseId(courseId);
    }

    @Override
    public void addPrerequisite(Long unitId, Long prerequisiteId) {
        learningUnitOutputPort.addPrerequisite(unitId, prerequisiteId);
    }

    private void validateUnit(LearningUnit unit) {
        if (unit.getTitle() == null || unit.getTitle().isBlank()) {
            throw new IllegalArgumentException("Unit title cannot be empty");
        }
        if (unit.getCourseId() == null) {
            throw new IllegalArgumentException("Unit must belong to a course");
        }
    }
}