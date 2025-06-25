package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningCompositeService {

    private final LearningUnitService unitService;
    private final LearningTitleService titleService;
    private final LearningContentService contentService;

    public LearningUnitsEntity createUnitWithTitlesAndContents(LearningUnitsEntity unit, List<LearningTitleEntity> titles) {
        LearningUnitsEntity savedUnit = unitService.createUnit(unit);

        for (LearningTitleEntity title : titles) {
            title.setUnit(savedUnit);
            LearningTitleEntity savedTitle = titleService.createTitle(title);

            for (LearningContentEntity content : title.getContents()) {
                content.setTitle(savedTitle);
                contentService.createContent(content);
            }
        }

        return savedUnit;
    }
}
