package com.pyAcademy.pyAcademy.features.learning.domain.repository.implementation;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnit;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.abstraction.LearningUnitRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningUnitJpaRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.mapper.LearningUnitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LearningUnitRepositoryImpl implements LearningUnitRepository {

    private final LearningUnitJpaRepository jpaRepository;
    private final LearningUnitMapper mapper;

    @Override
    public LearningUnit save(LearningUnit unit) {
        var entity = mapper.toEntity(unit);
        var savedEntity = jpaRepository.save(entity);
        return mapper.toDomain(savedEntity);
    }

    @Override
    public Optional<LearningUnit> findById(Long id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<LearningUnit> findByCourseId(Long courseId) {
        return jpaRepository.findByCourseId(courseId).stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public LearningUnit update(LearningUnit unit) {
        var entity = mapper.toEntity(unit);
        var updatedEntity = jpaRepository.save(entity);
        return mapper.toDomain(updatedEntity);
    }

    @Override
    public void addPrerequisite(Long unitId, Long prerequisiteId) {
        // Verificar que ambas unidades existan
        LearningUnitsEntity unit = jpaRepository.findById(unitId)
                .orElseThrow(() -> new IllegalArgumentException("Unit not found"));

        LearningUnitsEntity prerequisite = jpaRepository.findById(prerequisiteId)
                .orElseThrow(() -> new IllegalArgumentException("Prerequisite unit not found"));

        // Agregar la relación
        unit.getPrerequisites().add(prerequisite);
        jpaRepository.save(unit);
    }
}