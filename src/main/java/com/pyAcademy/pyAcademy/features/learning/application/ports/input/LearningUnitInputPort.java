package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;

import java.util.List;

public interface LearningUnitInputPort {
    LearningUnit createUnit(LearningUnit unit);
    LearningUnit updateUnit(LearningUnit unit);
    void deleteUnit(Long unitId);
    LearningUnit getUnitById(Long unitId);
    List<LearningUnit> getUnitsByCourseId(Long courseId);
    void addPrerequisite(Long unitId, Long prerequisiteId);
}