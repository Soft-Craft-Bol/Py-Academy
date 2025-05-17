package com.pyAcademy.pyAcademy.course.infraestructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pyAcademy.pyAcademy.core.config.TestSecurityConfig;
import com.pyAcademy.pyAcademy.features.course.application.CourseService;
import com.pyAcademy.pyAcademy.features.course.infraestructure.CourseController;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CourseController.class)
@ActiveProfiles("test")
@Import(TestSecurityConfig.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createCourse_Positive() throws Exception {
        CourseEntity course = new CourseEntity();
        course.setId(1L);
        course.setName("Curso de Java");
        course.setDescription("Curso básico de Java");
        course.setDurationInHours(30);
        course.setLevel("basico");
        course.setPrice(150.0);
        course.setInstructor("Ana melano");
        course.setStartDate(LocalDate.of(2023, 11, 1));
        course.setEndDate(LocalDate.of(2023, 12, 1));
        course.setMaxStudents(20);
        course.setActive(true);

        Mockito.when(courseService.createCourse(any(CourseEntity.class))).thenReturn(course);

        mockMvc.perform(post("/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Curso de Java"));
    }

    @Test
    void createCourse_Negative() throws Exception {
        mockMvc.perform(post("/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateCourse_Positive() throws Exception {
        CourseEntity course = new CourseEntity();
        course.setId(1L);
        course.setName("Curso de Java Avanzado");
        course.setDescription("Curso avanzado de Java");
        course.setDurationInHours(50);
        course.setLevel("Avanzado");
        course.setPrice(200.0);
        course.setInstructor("Ana López");
        course.setStartDate(LocalDate.of(2023, 11, 1));
        course.setEndDate(LocalDate.of(2023, 12, 15));
        course.setMaxStudents(15);
        course.setActive(true);

        Mockito.when(courseService.updateCourse(eq(1L), any(CourseEntity.class))).thenReturn(course);

        mockMvc.perform(put("/courses/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Curso de Java Avanzado"));
    }

    @Test
    void updateCourse_Negative() throws Exception {
        Mockito.when(courseService.updateCourse(eq(99L), any(CourseEntity.class)))
                .thenThrow(new RuntimeException("Curso no encontrado"));

        CourseEntity course = new CourseEntity();
        course.setName("Curso inexistente");

        mockMvc.perform(put("/courses/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(course)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Curso no encontrado"));
    }

    @Test
    void deleteCourse_Positive() throws Exception {
        Mockito.doNothing().when(courseService).deleteCourse(1L);

        mockMvc.perform(delete("/courses/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteCourse_Negative() throws Exception {
        Mockito.doThrow(new RuntimeException("Curso no encontrado")).when(courseService).deleteCourse(99L);

        mockMvc.perform(delete("/courses/99"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Curso no encontrado"));
    }
}