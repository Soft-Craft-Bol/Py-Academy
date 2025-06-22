package com.pyAcademy.pyAcademy.features.exercises.domain;


import com.pyAcademy.pyAcademy.features.exercises.domain.models.TestCasesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TestCasesRepository extends JpaRepository<TestCasesEntity, Long> {
    
    List<TestCasesEntity> findByExerciseIdOrderByWeight(Long exerciseId);
    
    @Query("SELECT t FROM TestCasesEntity t WHERE t.exercise.id = :exerciseId AND t.isHidden = :isHidden ORDER BY t.weight")
    List<TestCasesEntity> findByExerciseAndVisibility(@Param("exerciseId") Long exerciseId, @Param("isHidden") BigDecimal isHidden);
    
    @Query("SELECT t FROM TestCasesEntity t WHERE t.exercise.id = :exerciseId AND t.isHidden = 0 ORDER BY t.weight")
    List<TestCasesEntity> findVisibleTestCasesByExercise(@Param("exerciseId") Long exerciseId);
    
    @Query("SELECT t FROM TestCasesEntity t WHERE t.exercise.id = :exerciseId AND t.isHidden = 1 ORDER BY t.weight")
    List<TestCasesEntity> findHiddenTestCasesByExercise(@Param("exerciseId") Long exerciseId);
}