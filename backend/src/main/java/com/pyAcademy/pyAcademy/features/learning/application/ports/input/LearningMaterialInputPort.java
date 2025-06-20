package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;

import java.util.List;

public interface LearningMaterialInputPort {
    LearningMaterialsEntity createMaterial(LearningMaterialsEntity material);
    LearningMaterialsEntity updateMaterial(LearningMaterialsEntity material);
    void deleteMaterial(Long materialId);
    LearningMaterialsEntity getMaterialById(Long materialId);
    List<LearningMaterialsEntity> getMaterialsByUnitId(Long unitId);
    LearningMaterialsEntity uploadMaterialWithFile(LearningMaterialsEntity material, byte[] fileContent);
}