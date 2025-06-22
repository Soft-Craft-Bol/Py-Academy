package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.LearningMaterialJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningMaterialService {

    private final LearningMaterialJpaRepository materialRepository;

    public LearningMaterialsEntity createMaterial(LearningMaterialsEntity material) {
        return materialRepository.save(material);
    }

    public List<LearningMaterialsEntity> getMaterialsByUnitId(Long unitId) {
        return materialRepository.findByUnit_UnitId(unitId);
    }

    public void deleteMaterial(Long materialId) {
        materialRepository.deleteById(materialId);
    }
}