
package com.pyAcademy.pyAcademy.features.learning.application.usecase;

import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningMaterialInputPort;
import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningMaterialOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.enums.MaterialType;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static com.pyAcademy.pyAcademy.features.learning.domain.enums.MaterialType.*;

@Service
@RequiredArgsConstructor
public class ManageLearningMaterialUseCase implements LearningMaterialInputPort {

    private final LearningMaterialOutputPort learningMaterialOutputPort;

    @Override
    public LearningMaterialsEntity createMaterial(LearningMaterialsEntity material) {
        validateMaterial(material);
        material.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        material.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        return learningMaterialOutputPort.save(material);
    }

    @Override
    public LearningMaterialsEntity updateMaterial(LearningMaterialsEntity material) {
        LearningMaterialsEntity existing = getMaterialById(material.getMaterialId());
        validateMaterial(material);

        existing.setTitle(material.getTitle());
        existing.setDescription(material.getDescription());
        existing.setMaterialType(material.getMaterialType());
        existing.setDurationMinutes(material.getDurationMinutes());
        existing.setIsMandatory(material.getIsMandatory());
        existing.setSequenceNumber(material.getSequenceNumber());
        existing.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return learningMaterialOutputPort.save(existing);
    }

    @Override
    public void deleteMaterial(Long materialId) {
        learningMaterialOutputPort.deleteById(materialId);
    }

    @Override
    public LearningMaterialsEntity getMaterialById(Long materialId) {
        return learningMaterialOutputPort.findById(materialId)
                .orElseThrow();
    }

    @Override
    public List<LearningMaterialsEntity> getMaterialsByUnitId(Long unitId) {
        return learningMaterialOutputPort.findByUnitId(unitId);
    }

    @Override
    public LearningMaterialsEntity uploadMaterialWithFile(LearningMaterialsEntity material, byte[] fileContent) {
        String fileUrl = learningMaterialOutputPort.saveFileContent(
                fileContent,
                generateFileName(material)
        );
        material.setUrl(fileUrl);
        return createMaterial(material);
    }

    private void validateMaterial(LearningMaterialsEntity material) {
        if (material.getTitle() == null || material.getTitle().isBlank()) {
            throw new IllegalArgumentException("Material title cannot be empty");
        }
        if (material.getUnit().getUnitId() == null) {
            throw new IllegalArgumentException("Material must belong to a unit");
        }
        // Más validaciones según necesidades
    }

    private String generateFileName(LearningMaterialsEntity material) {
        return "material_" + material.getUnit().getUnitId() + "_" +
                System.currentTimeMillis() + getFileExtension(material.getMaterialType());
    }


    private String getFileExtension(MaterialType type) {
        return type.getExtension();
    }
}