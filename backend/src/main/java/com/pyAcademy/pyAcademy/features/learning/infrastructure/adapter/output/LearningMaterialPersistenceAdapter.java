// LearningMaterialPersistenceAdapter.java
package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output;

import com.pyAcademy.pyAcademy.features.learning.application.ports.output.FileStoragePort;
import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningMaterialOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningMaterialJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningMaterialPersistenceAdapter implements LearningMaterialOutputPort {

    private final LearningMaterialJpaRepository learningMaterialRepository;
    private final FileStoragePort fileStoragePort;

    @Override
    public LearningMaterialsEntity save(LearningMaterialsEntity material) {
        return learningMaterialRepository.save(material);
    }

    @Override
    public Optional<LearningMaterialsEntity> findById(Long id) {
        return learningMaterialRepository.findById(id);
    }

    @Override
    public List<LearningMaterialsEntity> findByUnitId(Long unitId) {
        return learningMaterialRepository.findByUnit_UnitId(unitId);
    }

    @Override
    public void deleteById(Long id) {
        learningMaterialRepository.deleteById(id);
    }

    @Override
    public String saveFileContent(byte[] fileContent, String fileName) {
        return fileStoragePort.storeFile(fileContent, fileName);
    }
}