package com.pyAcademy.pyAcademy.features.learning.domain.repository;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningContentJpaRepository extends JpaRepository<LearningContentEntity, Long> {
    List<LearningContentEntity> findByTitle_Id(Long titleId);
}
