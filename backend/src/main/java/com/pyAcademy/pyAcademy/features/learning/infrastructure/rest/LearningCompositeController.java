package com.pyAcademy.pyAcademy.features.learning.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.learning.application.service.LearningCompositeService;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.UnitRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
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
        unit.setTitle(request.getTitle());
        unit.setDescription(request.getDescription());
        unit.setIsActive(request.getIsActive());
        unit.setSequenceNumber(request.getSequenceNumber());

        List<LearningTitleEntity> titles = request.getTitles().stream().map(titleRequest -> {
            LearningTitleEntity title = new LearningTitleEntity();
            title.setTitle(titleRequest.getTitle());
            title.setDescription(titleRequest.getDescription());
            title.setIsActive(titleRequest.getIsActive());
            title.setSequenceNumber(titleRequest.getSequenceNumber());

            Set<LearningContentEntity> contents = new HashSet<>(titleRequest.getContents().stream().map(contentRequest -> {
                LearningContentEntity content = new LearningContentEntity();
                content.setContent(contentRequest.getContent());
                return content;
            }).toList());

            title.setContents(contents);
            return title;
        }).toList();

        LearningUnitsEntity savedUnit = compositeService.createUnitWithTitlesAndContents(unit, new ArrayList<>(titles));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUnit);
    }
}