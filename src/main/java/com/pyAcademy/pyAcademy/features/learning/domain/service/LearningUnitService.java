package com.pyAcademy.pyAcademy.features.learning.domain.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;

import java.util.List;
import java.util.Optional;

public interface LearningUnitService {
    LearningUnit saveUnit(LearningUnit unit);
    Optional<LearningUnit> findById(Long id);
    List<LearningUnit> findAllByCourseId(Long courseId);
    void deleteUnit(Long id);
    LearningUnit updateUnit(LearningUnit unit);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}