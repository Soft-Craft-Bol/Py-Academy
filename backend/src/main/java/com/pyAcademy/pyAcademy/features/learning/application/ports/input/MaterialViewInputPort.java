package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.MaterialViewsEntity;

public interface MaterialViewInputPort {
    MaterialViewsEntity startView(Long materialId, Long userId);
    MaterialViewsEntity completeView(Long viewId);
    MaterialViewsEntity updateViewProgress(Long viewId, Integer progressPercentage);
    MaterialViewsEntity getViewDetails(Long viewId);
}