
package com.pyAcademy.pyAcademy.features.learning.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningMaterialsEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output.jpa.LearningUnitJpaRepository;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.CreateMaterialRequest;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.LearningMaterialResponse;
import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningMaterialInputPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/learning/materials")
@RequiredArgsConstructor
public class LearningMaterialController {

    private final LearningMaterialInputPort learningMaterialInputPort;
    private final LearningUnitJpaRepository learningUnitJpaRepository;

    @PostMapping
    public ResponseEntity<LearningMaterialResponse> createMaterial(@RequestBody CreateMaterialRequest request) {

        LearningUnitsEntity unit = learningUnitJpaRepository.findById(request.getUnitId())
                .orElseThrow(() -> new IllegalArgumentException("Unidad no encontrada"));

        LearningMaterialsEntity material = LearningMaterialsEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .url(request.getUrl())
                .materialType(request.getMaterialType())
                .durationMinutes(request.getDurationMinutes())
                .isMandatory(request.getIsMandatory())
                .sequenceNumber(request.getSequenceNumber())
                .unit(unit)
                .build();

        LearningMaterialsEntity savedMaterial = learningMaterialInputPort.createMaterial(material);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(savedMaterial));
    }

    @GetMapping("/{materialId}")
    public ResponseEntity<LearningMaterialResponse> getMaterial(@PathVariable Long materialId) {
        LearningMaterialsEntity material = learningMaterialInputPort.getMaterialById(materialId);
        return ResponseEntity.ok(mapToResponse(material));
    }

    @GetMapping("/unit/{unitId}")
    public ResponseEntity<List<LearningMaterialResponse>> getMaterialsByUnit(@PathVariable Long unitId) {
        List<LearningMaterialsEntity> materials = learningMaterialInputPort.getMaterialsByUnitId(unitId);
        List<LearningMaterialResponse> responses = materials.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{materialId}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long materialId) {
        learningMaterialInputPort.deleteMaterial(materialId);
        return ResponseEntity.noContent().build();
    }

    private LearningMaterialResponse mapToResponse(LearningMaterialsEntity material) {
        return LearningMaterialResponse.builder()
                .materialId(material.getMaterialId())
                .title(material.getTitle())
                .description(material.getDescription())
                .url(material.getUrl())
                .materialType(material.getMaterialType())
                .durationMinutes(material.getDurationMinutes())
                .isMandatory(material.getIsMandatory())
                .sequenceNumber(material.getSequenceNumber())
                .createdAt(material.getCreatedAt().toLocalDateTime())
                .updatedAt(material.getUpdatedAt().toLocalDateTime())
                .unitId(material.getUnit().getUnitId())
                .build();
    }
}