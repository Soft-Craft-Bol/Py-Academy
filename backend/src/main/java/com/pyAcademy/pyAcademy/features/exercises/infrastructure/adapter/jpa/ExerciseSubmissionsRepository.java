package com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa;


import com.pyAcademy.pyAcademy.features.exercises.domain.models.ExerciseSubmissionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseSubmissionsRepository extends JpaRepository<ExerciseSubmissionsEntity, Long> {
    
    List<ExerciseSubmissionsEntity> findByStudentIdOrderBySubmissionTimeDesc(Long studentId);
    
    List<ExerciseSubmissionsEntity> findByExerciseIdOrderBySubmissionTimeDesc(Long exerciseId);
    
    @Query("SELECT s FROM ExerciseSubmissionsEntity s WHERE s.student.id = :studentId AND s.exercise.id = :exerciseId ORDER BY s.submissionTime DESC")
    List<ExerciseSubmissionsEntity> findByStudentAndExercise(@Param("studentId") Long studentId, @Param("exerciseId") Long exerciseId);
    
    @Query("SELECT s FROM ExerciseSubmissionsEntity s WHERE s.student.id = :studentId AND s.exercise.id = :exerciseId AND s.status = 'success' ORDER BY s.submissionTime DESC")
    List<ExerciseSubmissionsEntity> findSuccessfulSubmissionsByStudentAndExercise(@Param("studentId") Long studentId, @Param("exerciseId") Long exerciseId);
    
    List<ExerciseSubmissionsEntity> findByStatusOrderBySubmissionTimeDesc(String status);
    
    @Query("SELECT s FROM ExerciseSubmissionsEntity s LEFT JOIN FETCH s.testCaseResults WHERE s.id = :id")
    Optional<ExerciseSubmissionsEntity> findByIdWithTestResults(@Param("id") Long id);
    
    @Query("SELECT s FROM ExerciseSubmissionsEntity s LEFT JOIN FETCH s.feedbacks WHERE s.id = :id")
    Optional<ExerciseSubmissionsEntity> findByIdWithFeedbacks(@Param("id") Long id);
    
    @Query("SELECT s FROM ExerciseSubmissionsEntity s WHERE s.submissionTime BETWEEN :startDate AND :endDate ORDER BY s.submissionTime DESC")
    List<ExerciseSubmissionsEntity> findBySubmissionTimeBetween(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);
}