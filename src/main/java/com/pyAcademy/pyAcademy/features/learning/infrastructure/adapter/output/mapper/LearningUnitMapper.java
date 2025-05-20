package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.mapper;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class LearningUnitMapper {

    public LearningUnitsEntity toEntity(LearningUnit unit) {
        LearningUnitsEntity entity = new LearningUnitsEntity();
        entity.setUnitId(unit.getUnitId());
        entity.setTitle(unit.getTitle());
        entity.setDescription(unit.getDescription());
        entity.setIsActive(unit.getIsActive() != null ? new BigDecimal(unit.getIsActive() ? "1" : "0") : BigDecimal.ZERO);
        entity.setCreatedAt(unit.getCreatedAt());
        entity.setUpdatedAt(unit.getUpdatedAt());
        entity.setSequenceNumber(unit.getSequenceNumber());

        // Asumimos que CourseEntity tiene un constructor que acepta solo el ID
        entity.setCourse(new com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity(unit.getCourseId()));

        return entity;
    }

    public LearningUnit toDomain(LearningUnitsEntity entity) {
        return LearningUnit.builder()
                .unitId(entity.getUnitId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .isActive(entity.getIsActive().compareTo(BigDecimal.ZERO) > 0)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .sequenceNumber(entity.getSequenceNumber())
                .courseId(entity.getCourse().getId())
                .build();
    }
}