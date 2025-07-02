package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningUnitJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LearningUnitService {

    private final LearningUnitJpaRepository unitRepository;

    public LearningUnitsEntity createUnit(LearningUnitsEntity unit) {
        return unitRepository.save(unit);
    }

    public LearningUnitsEntity getUnitById(Long unitId) {
        return unitRepository.findById(unitId)
                .orElseThrow(() -> new IllegalArgumentException("Unit not found"));
    }

    public void deleteUnit(Long unitId) {
        unitRepository.deleteById(unitId);
    }
}