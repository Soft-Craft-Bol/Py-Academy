// LearningUnitOutputPort.java
package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;

import java.util.List;
import java.util.Optional;

public interface LearningUnitOutputPort {
    LearningUnitsEntity save(LearningUnitsEntity unit);
    Optional<LearningUnitsEntity> findById(Long id);
    List<LearningUnitsEntity> findByCourseId(Long courseId);
    void deleteById(Long id);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}