package com.pyAcademy.pyAcademy.features.exercises.domain;


import com.pyAcademy.pyAcademy.features.exercises.domain.models.TeacherFeedbacksEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherFeedbacksRepository extends JpaRepository<TeacherFeedbacksEntity, Long> {
    
    List<TeacherFeedbacksEntity> findBySubmissionIdOrderByGivenAtDesc(Long submissionId);
    
    List<TeacherFeedbacksEntity> findByTeacherIdOrderByGivenAtDesc(Long teacherId);
    
    @Query("SELECT f FROM TeacherFeedbacksEntity f WHERE f.submission.student.id = :studentId ORDER BY f.givenAt DESC")
    List<TeacherFeedbacksEntity> findByStudentId(@Param("studentId") Long studentId);
    
    @Query("SELECT f FROM TeacherFeedbacksEntity f WHERE f.submission.exercise.id = :exerciseId ORDER BY f.givenAt DESC")
    List<TeacherFeedbacksEntity> findByExerciseId(@Param("exerciseId") Long exerciseId);
    
    @Query("SELECT f FROM TeacherFeedbacksEntity f WHERE f.teacher.id = :teacherId AND f.submission.exercise.id = :exerciseId ORDER BY f.givenAt DESC")
    List<TeacherFeedbacksEntity> findByTeacherAndExercise(@Param("teacherId") Long teacherId, @Param("exerciseId") Long exerciseId);
}