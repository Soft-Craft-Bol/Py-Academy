package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningMaterialJpaRepository extends JpaRepository<LearningMaterialsEntity, Long> {
    List<LearningMaterialsEntity> findByUnit_UnitId(Long unitId);
}
