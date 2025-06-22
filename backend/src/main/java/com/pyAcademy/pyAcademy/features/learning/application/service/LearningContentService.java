package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.LearningContentJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningContentService {

    private final LearningContentJpaRepository contentRepository;

    public LearningContentEntity createContent(LearningContentEntity content) {
        return contentRepository.save(content);
    }

    public List<LearningContentEntity> getContentsByTitleId(Long titleId) {
        return contentRepository.findByTitle_Id(titleId);
    }

    public void deleteContent(Long contentId) {
        contentRepository.deleteById(contentId);
    }
}
