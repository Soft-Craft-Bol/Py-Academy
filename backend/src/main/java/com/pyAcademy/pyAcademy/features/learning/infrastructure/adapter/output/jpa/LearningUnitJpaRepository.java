package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningUnitJpaRepository extends JpaRepository<LearningUnitsEntity, Long> {

    @Query("SELECT lu FROM LearningUnitsEntity lu WHERE lu.course.id = :courseId")
    List<LearningUnitsEntity> findByCourseId(@Param("courseId") Long courseId);

    @Modifying
    @Query(value = "INSERT INTO unit_prerequisites (unit_id, prerequisite_id) VALUES (:unitId, :prerequisiteId)", nativeQuery = true)
    void addPrerequisite(@Param("unitId") Long unitId, @Param("prerequisiteId") Long prerequisiteId);

}