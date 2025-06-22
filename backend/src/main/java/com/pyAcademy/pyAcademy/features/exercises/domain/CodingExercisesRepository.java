package com.pyAcademy.pyAcademy.features.exercises.domain;


import com.pyAcademy.pyAcademy.features.exercises.domain.models.CodingExercisesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingExercisesRepository extends JpaRepository<CodingExercisesEntity, Long> {
    
    List<CodingExercisesEntity> findByIsActiveTrueOrderBySequenceNumber();
    
    List<CodingExercisesEntity> findByLanguageAndIsActiveTrueOrderBySequenceNumber(String language);
    
    List<CodingExercisesEntity> findByDifficultyLevelAndIsActiveTrueOrderBySequenceNumber(String difficultyLevel);
    
    @Query("SELECT e FROM CodingExercisesEntity e WHERE e.language = :language AND e.difficultyLevel = :difficulty AND e.isActive = true ORDER BY e.sequenceNumber")
    List<CodingExercisesEntity> findByLanguageAndDifficultyAndActive(@Param("language") String language, @Param("difficulty") String difficulty);
    
    Optional<CodingExercisesEntity> findByIdAndIsActiveTrue(Long id);
    
    @Query("SELECT e FROM CodingExercisesEntity e LEFT JOIN FETCH e.testCases WHERE e.id = :id AND e.isActive = true")
    Optional<CodingExercisesEntity> findByIdWithTestCases(@Param("id") Long id);
}