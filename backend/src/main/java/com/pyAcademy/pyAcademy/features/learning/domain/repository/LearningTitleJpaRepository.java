package com.pyAcademy.pyAcademy.features.learning.domain.repository;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearningTitleJpaRepository extends JpaRepository<LearningTitleEntity, Long> {
}