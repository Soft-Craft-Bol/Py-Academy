package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.repository.LearningUnitsRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.UnitResponse;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.mapper.LearningUnitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LearningUnitRetrievalService {

    private final LearningUnitsRepository unitsRepository;
    private final LearningUnitMapper mapper;

    /**
     * Obtiene todas las unidades con su información completa
     * @return Lista de unidades con títulos y contenidos
     */
    public List<UnitResponse> getAllUnitsWithCompleteData() {
        List<LearningUnitsEntity> units = unitsRepository.findAllWithCompleteData();
        return mapper.toUnitResponseList(units);
    }

    /**
     * Obtiene solo las unidades activas con su información completa
     * @return Lista de unidades activas con títulos y contenidos
     */
    public List<UnitResponse> getAllActiveUnitsWithCompleteData() {
        List<LearningUnitsEntity> units = unitsRepository.findAllActiveWithCompleteData();
        return mapper.toUnitResponseList(units);
    }

    /**
     * Obtiene unidades por curso específico
     * @param courseId ID del curso
     * @return Lista de unidades del curso con información completa
     */
    public List<UnitResponse> getUnitsByCourse(Long courseId) {
        List<LearningUnitsEntity> units = unitsRepository.findByCourseIdWithCompleteData(courseId);
        return mapper.toUnitResponseList(units);
    }
}
