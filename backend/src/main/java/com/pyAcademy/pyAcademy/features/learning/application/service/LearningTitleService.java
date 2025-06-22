package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.LearningTitleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LearningTitleService {

    private final LearningTitleJpaRepository titleRepository;

    public LearningTitleEntity createTitle(LearningTitleEntity title) {
        return titleRepository.save(title);
    }

    public LearningTitleEntity getTitleById(Long titleId) {
        return titleRepository.findById(titleId)
                .orElseThrow(() -> new IllegalArgumentException("Title not found"));
    }

    public void deleteTitle(Long titleId) {
        titleRepository.deleteById(titleId);
    }
}