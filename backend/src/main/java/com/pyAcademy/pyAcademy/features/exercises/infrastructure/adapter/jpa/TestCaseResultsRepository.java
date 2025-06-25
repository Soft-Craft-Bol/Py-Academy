package com.pyAcademy.pyAcademy.features.exercises.infrastructure.adapter.jpa;


import com.pyAcademy.pyAcademy.features.exercises.domain.models.TestCaseResultsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestCaseResultsRepository extends JpaRepository<TestCaseResultsEntity, Long> {
    
    List<TestCaseResultsEntity> findBySubmissionId(Long submissionId);
    
    List<TestCaseResultsEntity> findByTestCaseId(Long testCaseId);
    
    @Query("SELECT r FROM TestCaseResultsEntity r WHERE r.submission.id = :submissionId AND r.isPassed = true")
    List<TestCaseResultsEntity> findPassedResultsBySubmission(@Param("submissionId") Long submissionId);
    
    @Query("SELECT r FROM TestCaseResultsEntity r WHERE r.submission.id = :submissionId AND r.isPassed = false")
    List<TestCaseResultsEntity> findFailedResultsBySubmission(@Param("submissionId") Long submissionId);
    
    @Query("SELECT COUNT(r) FROM TestCaseResultsEntity r WHERE r.submission.id = :submissionId AND r.isPassed = true")
    Long countPassedTestCasesBySubmission(@Param("submissionId") Long submissionId);
    
    @Query("SELECT COUNT(r) FROM TestCaseResultsEntity r WHERE r.submission.id = :submissionId")
    Long countTotalTestCasesBySubmission(@Param("submissionId") Long submissionId);
}