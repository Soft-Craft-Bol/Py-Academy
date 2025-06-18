package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;

import java.util.List;

public interface LearningUnitInputPort {
    LearningUnitsEntity createUnit(LearningUnitsEntity unit);
    LearningUnitsEntity updateUnit(LearningUnitsEntity unit);
    void deleteUnit(Long unitId);
    LearningUnitsEntity getUnitById(Long unitId);
    List<LearningUnitsEntity> getUnitsByCourseId(Long courseId);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}