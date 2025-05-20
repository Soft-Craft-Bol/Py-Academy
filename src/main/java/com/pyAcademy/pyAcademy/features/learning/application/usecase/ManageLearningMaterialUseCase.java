
package com.pyAcademy.pyAcademy.features.learning.application.usecase;

import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningMaterialInputPort;
import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningMaterialOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.exception.MaterialNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageLearningMaterialUseCase implements LearningMaterialInputPort {

    private final LearningMaterialOutputPort learningMaterialOutputPort;

    @Override
    public LearningMaterial createMaterial(LearningMaterial material) {
        validateMaterial(material);
        material.setCreatedAt(LocalDateTime.now());
        material.setUpdatedAt(LocalDateTime.now());
        return learningMaterialOutputPort.save(material);
    }

    @Override
    public LearningMaterial updateMaterial(LearningMaterial material) {
        LearningMaterial existing = getMaterialById(material.getMaterialId());
        validateMaterial(material);

        existing.setTitle(material.getTitle());
        existing.setDescription(material.getDescription());
        existing.setMaterialType(material.getMaterialType());
        existing.setDurationMinutes(material.getDurationMinutes());
        existing.setIsMandatory(material.getIsMandatory());
        existing.setSequenceNumber(material.getSequenceNumber());
        existing.setUpdatedAt(LocalDateTime.now());

        return learningMaterialOutputPort.update(existing);
    }

    @Override
    public void deleteMaterial(Long materialId) {
        learningMaterialOutputPort.deleteById(materialId);
    }

    @Override
    public LearningMaterial getMaterialById(Long materialId) {
        return learningMaterialOutputPort.findById(materialId)
                .orElseThrow();
    }

    @Override
    public List<LearningMaterial> getMaterialsByUnitId(Long unitId) {
        return learningMaterialOutputPort.findByUnitId(unitId);
    }

    @Override
    public LearningMaterial uploadMaterialWithFile(LearningMaterial material, byte[] fileContent) {
        String fileUrl = learningMaterialOutputPort.saveFileContent(
                fileContent,
                generateFileName(material)
        );
        material.setUrl(fileUrl);
        return createMaterial(material);
    }

    private void validateMaterial(LearningMaterial material) {
        if (material.getTitle() == null || material.getTitle().isBlank()) {
            throw new IllegalArgumentException("Material title cannot be empty");
        }
        if (material.getUnitId() == null) {
            throw new IllegalArgumentException("Material must belong to a unit");
        }
        // Más validaciones según necesidades
    }

    private String generateFileName(LearningMaterial material) {
        return "material_" + material.getUnitId() + "_" +
                System.currentTimeMillis() + getFileExtension(material.getMaterialType());
    }

    private String getFileExtension(LearningMaterial.MaterialType type) {
        return switch (type) {
            case PDF -> ".pdf";
            case VIDEO -> ".mp4";
            case PRESENTATION -> ".pptx";
            case LINK -> ".url";
        };
    }
}