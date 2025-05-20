package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

import com.pyAcademy.pyAcademy.features.learning.domain.models.MaterialView;

import java.util.Optional;

public interface MaterialViewOutputPort {
    MaterialView save(MaterialView view);
    Optional<MaterialView> findById(Long viewId);
    MaterialView update(MaterialView view);
    Optional<MaterialView> findActiveView(Long materialId, Long userId);
}