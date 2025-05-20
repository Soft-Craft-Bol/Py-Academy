// LearningMaterialPersistenceAdapter.java
package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output;

import com.pyAcademy.pyAcademy.features.learning.application.ports.output.FileStoragePort;
import com.pyAcademy.pyAcademy.features.learning.application.ports.output.LearningMaterialOutputPort;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction.LearningMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningMaterialPersistenceAdapter implements LearningMaterialOutputPort {

    private final LearningMaterialRepository learningMaterialRepository;
    private final FileStoragePort fileStoragePort;

    @Override
    public LearningMaterial save(LearningMaterial material) {
        return learningMaterialRepository.save(material);
    }

    @Override
    public Optional<LearningMaterial> findById(Long id) {
        return learningMaterialRepository.findById(id);
    }

    @Override
    public List<LearningMaterial> findByUnitId(Long unitId) {
        return learningMaterialRepository.findByUnitId(unitId);
    }

    @Override
    public void deleteById(Long id) {
        learningMaterialRepository.deleteById(id);
    }

    @Override
    public LearningMaterial update(LearningMaterial material) {
        return learningMaterialRepository.update(material);
    }

    @Override
    public String saveFileContent(byte[] fileContent, String fileName) {
        return fileStoragePort.storeFile(fileContent, fileName);
    }
}