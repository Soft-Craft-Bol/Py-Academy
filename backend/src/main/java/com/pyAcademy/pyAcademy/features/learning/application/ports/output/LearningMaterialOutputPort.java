package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;

import java.util.List;
import java.util.Optional;

public interface LearningMaterialOutputPort {
    LearningMaterialsEntity save(LearningMaterialsEntity material);
    Optional<LearningMaterialsEntity> findById(Long id);
    List<LearningMaterialsEntity> findByUnitId(Long unitId);
    void deleteById(Long id);
    String saveFileContent(byte[] fileContent, String fileName);
}