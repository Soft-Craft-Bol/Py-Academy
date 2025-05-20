package com.pyAcademy.pyAcademy.features.learning.domain.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;

import java.util.List;
import java.util.Optional;

public interface LearningMaterialService {
    LearningMaterial saveMaterial(LearningMaterial material);
    Optional<LearningMaterial> findById(Long id);
    List<LearningMaterial> findAllByUnitId(Long unitId);
    void deleteMaterial(Long id);
    LearningMaterial updateMaterial(LearningMaterial material);


}