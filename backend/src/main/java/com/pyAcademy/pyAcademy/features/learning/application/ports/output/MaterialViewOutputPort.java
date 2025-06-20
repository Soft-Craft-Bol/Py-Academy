package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

import com.pyAcademy.pyAcademy.features.learning.domain.models.MaterialViewsEntity;

import java.util.Optional;

public interface MaterialViewOutputPort {
    MaterialViewsEntity save(MaterialViewsEntity view);
    Optional<MaterialViewsEntity> findById(Long viewId);
    MaterialViewsEntity update(MaterialViewsEntity view);
    Optional<MaterialViewsEntity> findActiveView(Long materialId, Long userId);
}