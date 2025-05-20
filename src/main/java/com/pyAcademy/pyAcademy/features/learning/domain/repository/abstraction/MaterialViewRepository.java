package com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.features.learning.domain.models.MaterialViewsEntity;

public interface MaterialViewRepository {
    MaterialViewsEntity save(MaterialViewsEntity entity);
}
