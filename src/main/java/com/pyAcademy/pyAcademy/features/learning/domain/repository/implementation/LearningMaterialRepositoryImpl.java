// LearningMaterialRepositoryImpl.java
package com.pyAcademy.pyAcademy.features.learning.domain.repository.implementation;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterial;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction.LearningMaterialRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningMaterialJpaRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.mapper.LearningMaterialMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningMaterialRepositoryImpl implements LearningMaterialRepository {

    private final LearningMaterialJpaRepository jpaRepository;
    private final LearningMaterialMapper mapper;

    @Override
    public LearningMaterial save(LearningMaterial material) {
        var entity = mapper.toEntity(material);
        var savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<LearningMaterial> findById(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<LearningMaterial> findByUnitId(Long unitId) {
        return jpaRepository.findByUnit_UnitId(unitId).stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public LearningMaterial update(LearningMaterial material) {
        var entity = mapper.toEntity(material);
        var updatedEntity = jpaRepository.save(entity); // save actúa como update si existe ID
        return mapper.toDomain(updatedEntity);
    }
}