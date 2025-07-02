package com.pyAcademy.pyAcademy.features.learning.application.service;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningContentEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningTitleEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Transactional
public class LearningCompositeService {

    private final LearningUnitService unitService;
    private final LearningTitleService titleService;
    private final LearningContentService contentService;
    private final CourseRepository courseRepository; // Inyectar el repositorio del curso

    public LearningUnitsEntity createUnitWithTitlesAndContents(LearningUnitsEntity unit, List<LearningTitleEntity> titles, Long courseId) {
        // Buscar el curso por ID
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con ID: " + courseId));
        
        // Asignar el curso a la unidad
        unit.setCourse(course);
        
        // Guardar la unidad
        LearningUnitsEntity savedUnit = unitService.createUnit(unit);

        // Procesar títulos y contenidos
        for (LearningTitleEntity title : titles) {
            // Guardar una copia de los contenidos antes de limpiar la relación
            Set<LearningContentEntity> originalContents = new HashSet<>(title.getContents());
            
            // Limpiar la relación de contenidos temporalmente
            title.setContents(new HashSet<>());
            
            // Establecer la relación con la unidad
            title.setUnit(savedUnit);
            
            // Guardar el título primero
            LearningTitleEntity savedTitle = titleService.createTitle(title);

            // Ahora guardar los contenidos con la referencia correcta al título
            for (LearningContentEntity content : originalContents) {
                content.setTitle(savedTitle);
                LearningContentEntity savedContent = contentService.createContent(content);
                savedTitle.getContents().add(savedContent);
            }
        }

        return savedUnit;
    }
}