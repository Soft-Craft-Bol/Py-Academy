package com.pyAcademy.pyAcademy.features.learning.domain.repository;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.ports.LoadLearningUnitPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningUnitsRepository extends JpaRepository<LearningUnitsEntity, Long>, LoadLearningUnitPort {

    @Query("SELECT DISTINCT u FROM LearningUnitsEntity u " +
           "LEFT JOIN FETCH u.course " +
           "LEFT JOIN FETCH u.titles t " +
           "LEFT JOIN FETCH t.contents " +
           "ORDER BY u.sequenceNumber ASC")
    List<LearningUnitsEntity> findAllWithCompleteData();

    @Query("SELECT DISTINCT u FROM LearningUnitsEntity u " +
           "LEFT JOIN FETCH u.course " +
           "LEFT JOIN FETCH u.titles t " +
           "LEFT JOIN FETCH t.contents " +
           "WHERE u.isActive = true " +
           "ORDER BY u.sequenceNumber ASC")
    List<LearningUnitsEntity> findAllActiveWithCompleteData();

    @Query("SELECT DISTINCT u FROM LearningUnitsEntity u " +
           "LEFT JOIN FETCH u.course " +
           "LEFT JOIN FETCH u.titles t " +
           "LEFT JOIN FETCH t.contents " +
           "WHERE u.course.id = :courseId " +
           "ORDER BY u.sequenceNumber ASC")
    List<LearningUnitsEntity> findByCourseIdWithCompleteData(Long courseId);
}
