package com.pyAcademy.pyAcademy.features.learning.domain.ports;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;

import java.util.Optional;

public interface LoadLearningUnitPort {
    Optional<LearningUnitsEntity> findById(Long id);
}
