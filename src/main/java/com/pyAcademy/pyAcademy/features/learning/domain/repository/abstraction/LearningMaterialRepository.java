package com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;

import java.util.List;
import java.util.Optional;

public interface LearningMaterialRepository {
    LearningMaterial save(LearningMaterial material);
    Optional<LearningMaterial> findById(Long id);
    List<LearningMaterial> findByUnitId(Long unitId);
    void deleteById(Long id);
    LearningMaterial update(LearningMaterial material);
}