// LearningUnitOutputPort.java
package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;

import java.util.List;
import java.util.Optional;

public interface LearningUnitOutputPort {
    LearningUnit save(LearningUnit unit);
    Optional<LearningUnit> findById(Long id);
    List<LearningUnit> findByCourseId(Long courseId);
    void deleteById(Long id);
    LearningUnit update(LearningUnit unit);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}