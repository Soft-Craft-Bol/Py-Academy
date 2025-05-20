package com.pyAcademy.pyAcademy.features.learning.application.ports.input;

import com.pyAcademy.pyAcademy.features.learning.domain.models.MaterialView;

public interface MaterialViewInputPort {
    MaterialView startView(Long materialId, Long userId);
    MaterialView completeView(Long viewId);
    MaterialView updateViewProgress(Long viewId, Integer progressPercentage);
    MaterialView getViewDetails(Long viewId);
}