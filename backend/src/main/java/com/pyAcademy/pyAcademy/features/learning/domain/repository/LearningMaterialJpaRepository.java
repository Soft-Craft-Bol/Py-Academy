package com.pyAcademy.pyAcademy.features.learning.domain.repository;


import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningMaterialJpaRepository extends JpaRepository<LearningMaterialsEntity, Long> {
    List<LearningMaterialsEntity> findByUnit_UnitId(Long unitId);
}