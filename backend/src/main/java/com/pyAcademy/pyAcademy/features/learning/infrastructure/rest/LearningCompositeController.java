package com.pyAcademy.pyAcademy.features.learning.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.learning.application.service.LearningCompositeService;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.ContentRequest;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.TitleRequest;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.UnitRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/learning/composite")
@RequiredArgsConstructor
public class LearningCompositeController {

    private final LearningCompositeService compositeService;

    @PostMapping("/create")
    public ResponseEntity<LearningUnitsEntity> createUnitWithTitlesAndContents(@RequestBody UnitRequest request) {
        LearningUnitsEntity unit = new LearningUnitsEntity();
        unit.setTitle(request.title());
        unit.setDescription(request.description());
        unit.setIsActive(request.isActive());
        unit.setSequenceNumber(request.sequenceNumber());

        List<LearningTitleEntity> titles = request.titles().stream().map(titleRequest -> {
            LearningTitleEntity title = new LearningTitleEntity();
            title.setTitle(titleRequest.title());
            title.setDescription(titleRequest.description());
            title.setIsActive(titleRequest.isActive());
            title.setSequenceNumber(titleRequest.sequenceNumber());

            List<LearningContentEntity> contents = titleRequest.contents().stream().map(contentRequest -> {
                LearningContentEntity content = new LearningContentEntity();
                content.setContent(contentRequest.content());
                return content;
            }).toList();

            title.setContents((Set<LearningContentEntity>) contents);
            return title;
        }).toList();

        LearningUnitsEntity savedUnit = compositeService.createUnitWithTitlesAndContents(unit, titles);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUnit);
    }
}