package com.pyAcademy.pyAcademy.features.learning.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.learning.domain.models.LearningUnitsEntity;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.CreateUnitRequest;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.response.LearningUnitResponse;
import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningUnitInputPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/learning/units")
@RequiredArgsConstructor
public class LearningUnitController {

    private final LearningUnitInputPort learningUnitInputPort;

    @PostMapping
    public ResponseEntity<LearningUnitResponse> createUnit(@RequestBody CreateUnitRequest request) {
        LearningUnitsEntity unit = LearningUnitsEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .isActive(request.getIsActive())
                .sequenceNumber(request.getSequenceNumber())
                .course(request.getCourseId() != null ? new CourseEntity(request.getCourseId()) : null)
                .build();

        LearningUnitsEntity savedUnit = learningUnitInputPort.createUnit(unit);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(savedUnit));
    }

    @GetMapping("/{unitId}")
    public ResponseEntity<LearningUnitResponse> getUnit(@PathVariable Long unitId) {
        LearningUnitsEntity unit = learningUnitInputPort.getUnitById(unitId);
        return ResponseEntity.ok(mapToResponse(unit));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<LearningUnitResponse>> getUnitsByCourse(@PathVariable Long courseId) {
        List<LearningUnitsEntity> units = learningUnitInputPort.getUnitsByCourseId(courseId);
        List<LearningUnitResponse> responses = units.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{unitId}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long unitId) {
        learningUnitInputPort.deleteUnit(unitId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{unitId}/prerequisites/{prerequisiteId}")
    public ResponseEntity<Void> addPrerequisite(
            @PathVariable Long unitId,
            @PathVariable Long prerequisiteId) {
        learningUnitInputPort.addPrerequisite(unitId, prerequisiteId);
        return ResponseEntity.noContent().build();
    }

    private LearningUnitResponse mapToResponse(LearningUnitsEntity unit) {
        return LearningUnitResponse.builder()
                .unitId(unit.getUnitId())
                .title(unit.getTitle())
                .description(unit.getDescription())
                .isActive(unit.getIsActive())
                .createdAt(unit.getCreatedAt())
                .updatedAt(unit.getUpdatedAt())
                .sequenceNumber(unit.getSequenceNumber())
                .courseId(unit.getCourse().getId())
                .prerequisiteIds(
                        unit.getPrerequisites()
                                .stream()
                                .map(LearningUnitsEntity::getUnitId)
                                .collect(Collectors.toList())
                )
                .build();
    }
}