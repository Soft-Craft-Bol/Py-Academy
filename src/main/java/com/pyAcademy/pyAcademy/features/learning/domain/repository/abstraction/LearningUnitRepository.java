package com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;

import java.util.List;
import java.util.Optional;

public interface LearningUnitRepository {
    LearningUnit save(LearningUnit unit);
    Optional<LearningUnit> findById(Long id);
    List<LearningUnit> findByCourseId(Long courseId);
    void deleteById(Long id);
    LearningUnit update(LearningUnit unit);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}