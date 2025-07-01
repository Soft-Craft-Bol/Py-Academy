package com.pyAcademy.pyAcademy.features.learning.infrastructure.mapper;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.ContentResponse;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.TitleResponse;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.UnitResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class LearningUnitMapper {

    public List<UnitResponse> toUnitResponseList(List<LearningUnitsEntity> units) {
        return units.stream()
                .map(this::toUnitResponse)
                .collect(Collectors.toList());
    }

    public UnitResponse toUnitResponse(LearningUnitsEntity unit) {
        return UnitResponse.builder()
                .unitId(unit.getUnitId())
                .title(unit.getTitle())
                .description(unit.getDescription())
                .isActive(unit.getIsActive())
                .sequenceNumber(unit.getSequenceNumber())
                .courseId(unit.getCourseId())
                .titles(toTitleResponseList(unit.getTitles()))
                .build();
    }

    private List<TitleResponse> toTitleResponseList(Set<LearningTitleEntity> titles) {
        return titles.stream()
                .sorted((t1, t2) -> Integer.compare(t1.getSequenceNumber(), t2.getSequenceNumber()))
                .map(this::toTitleResponse)
                .collect(Collectors.toList());
    }

    private TitleResponse toTitleResponse(LearningTitleEntity title) {
        return TitleResponse.builder()
                .title(title.getTitle())
                .description(title.getDescription())
                .isActive(title.getIsActive())
                .sequenceNumber(title.getSequenceNumber())
                .contents(toContentResponseList(title.getContents()))
                .build();
    }

    private List<ContentResponse> toContentResponseList(Set<LearningContentEntity> contents) {
        return contents.stream()
                .map(this::toContentResponse)
                .collect(Collectors.toList());
    }

    private ContentResponse toContentResponse(LearningContentEntity content) {
        return ContentResponse.builder()
                .content(content.getContent())
                .build();
    }
}
