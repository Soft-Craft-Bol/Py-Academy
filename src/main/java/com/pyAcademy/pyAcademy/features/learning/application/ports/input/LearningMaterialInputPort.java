package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;

import java.util.List;

public interface LearningMaterialInputPort {
    LearningMaterial createMaterial(LearningMaterial material);
    LearningMaterial updateMaterial(LearningMaterial material);
    void deleteMaterial(Long materialId);
    LearningMaterial getMaterialById(Long materialId);
    List<LearningMaterial> getMaterialsByUnitId(Long unitId);
    LearningMaterial uploadMaterialWithFile(LearningMaterial material, byte[] fileContent);
}