package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.mapper;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class LearningMaterialMapper {

    public LearningMaterialsEntity toEntity(LearningMaterial material) {
        LearningMaterialsEntity entity = new LearningMaterialsEntity();
        entity.setMaterialId(material.getMaterialId());
        entity.setTitle(material.getTitle());
        entity.setDescription(material.getDescription());
        entity.setUrl(material.getUrl());
        entity.setMaterialType(material.getMaterialType().name());
        entity.setDurationMinutes(material.getDurationMinutes());
        entity.setIsMandatory(material.getIsMandatory());
        entity.setSequenceNumber(material.getSequenceNumber());
        entity.setCreatedAt(Timestamp.valueOf(material.getCreatedAt()));
        entity.setUpdatedAt(Timestamp.valueOf(material.getUpdatedAt()));

        LearningUnitsEntity unit = new LearningUnitsEntity();
        unit.setUnitId(material.getUnitId());
        entity.setUnit(unit);

        return entity;
    }

    public LearningMaterial toDomain(LearningMaterialsEntity entity) {
        return LearningMaterial.builder()
                .materialId(entity.getMaterialId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .url(entity.getUrl())
                .materialType(LearningMaterial.MaterialType.valueOf(entity.getMaterialType()))
                .durationMinutes(entity.getDurationMinutes())
                .isMandatory(entity.getIsMandatory())
                .sequenceNumber(entity.getSequenceNumber())
                .createdAt(entity.getCreatedAt().toLocalDateTime())
                .updatedAt(entity.getUpdatedAt().toLocalDateTime())
                .unitId(entity.getUnit().getUnitId())
                .build();
    }
}