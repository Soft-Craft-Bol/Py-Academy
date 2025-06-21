package com.pyAcademy.pyAcademy.features.learning.infrastructure.rest;

import com.pyAcademy.pyAcademy.core.config.TestSecurityConfig;
import com.pyAcademy.pyAcademy.features.course.infraestructure.CourseController;
import com.pyAcademy.pyAcademy.features.learning.application.ports.input.LearningMaterialInputPort;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.dto.request.CreateMaterialRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@WebMvcTest(CourseController.class)
@ActiveProfiles("test")
@Import(TestSecurityConfig.class)
class LearningMaterialControllerTest {

    @Mock
    private LearningMaterialInputPort learningMaterialInputPort;

    @InjectMocks
    private LearningMaterialController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private LearningMaterial getMockMaterial() {
        return LearningMaterial.builder()
                .materialId(1L)
                .title("Intro to Java")
                .description("Basic Java")
                .url("http://example.com/java")
                .materialType(LearningMaterial.MaterialType.valueOf("VIDEO"))
                .durationMinutes(30)
                .isMandatory(true)
                .sequenceNumber(1)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .unitId(100L)
                .build();
    }

    @Test
    void createMaterial_shouldReturnCreatedMaterial() {
        CreateMaterialRequest request = new CreateMaterialRequest();
        request.setTitle("Intro to Java");
        request.setDescription("Basic Java");
        request.setUrl("http://example.com/java");
        request.setMaterialType(LearningMaterial.MaterialType.valueOf("VIDEO"));
        request.setDurationMinutes(30);
        request.setIsMandatory(true);
        request.setSequenceNumber(1);
        request.setUnitId(100L);

        LearningMaterial mockMaterial = getMockMaterial();

        when(learningMaterialInputPort.createMaterial(any())).thenReturn(mockMaterial);

        ResponseEntity<?> response = controller.createMaterial(request);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    void getMaterial_shouldReturnMaterialById() {
        LearningMaterial mockMaterial = getMockMaterial();

        when(learningMaterialInputPort.getMaterialById(1L)).thenReturn(mockMaterial);

        ResponseEntity<?> response = controller.getMaterial(1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    void getMaterialsByUnit_shouldReturnListOfMaterials() {
        LearningMaterial mockMaterial = getMockMaterial();

        when(learningMaterialInputPort.getMaterialsByUnitId(100L)).thenReturn(List.of(mockMaterial));

        ResponseEntity<?> response = controller.getMaterialsByUnit(100L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(((List<?>) response.getBody()).size()).isEqualTo(1);
    }

    @Test
    void deleteMaterial_shouldReturnNoContent() {
        doNothing().when(learningMaterialInputPort).deleteMaterial(1L);

        ResponseEntity<Void> response = controller.deleteMaterial(1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        verify(learningMaterialInputPort, times(1)).deleteMaterial(1L);
    }
}
