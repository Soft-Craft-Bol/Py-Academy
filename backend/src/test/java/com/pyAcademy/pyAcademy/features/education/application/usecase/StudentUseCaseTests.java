package com.pyAcademy.pyAcademy.features.education.application.usecase;


import com.pyAcademy.pyAcademy.features.auth.domain.enums.RoleEnum;
import com.pyAcademy.pyAcademy.features.auth.domain.models.RoleEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.domain.repository.StudentRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.StudentRegisterData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@SpringBootTest
public class StudentUseCaseTests {

    @InjectMocks
    private StudentUseCase studentUseCase;

    @Mock
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterStudent_SuccessfullyCreatesStudentEntity() {
        // Arrange
        Set<RoleEntity> roles = new HashSet<>();
        roles.add(RoleEntity.builder().roleEnum(RoleEnum.ESTUDIANTE).build());

        UserEntity baseUser = UserEntity.builder()
                .id(1L)
                .username("juan123")
                .password("encodedPassword")
                .email("juan@mail.com")
                .telefono(123456789L)
                .firstName("Juan")
                .lastName("Pérez")
                .photo("http://photo.url")
                .roles(roles)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();

        StudentRegisterData registerData = new StudentRegisterData(
                "A2023001", "Ingeniería de Sistemas", 3
        );

        ArgumentCaptor<StudentEntity> studentCaptor = ArgumentCaptor.forClass(StudentEntity.class);

        // Act
        studentUseCase.registerStudent(baseUser, registerData);

        // Assert
        verify(studentRepository, times(1)).save(studentCaptor.capture());
        StudentEntity savedStudent = studentCaptor.getValue();

        assertEquals(baseUser.getId(), savedStudent.getId());
        assertEquals(baseUser.getUsername(), savedStudent.getUsername());
        assertEquals("Ingeniería de Sistemas", savedStudent.getAcademicProgram());
        assertEquals("A2023001", savedStudent.getEnrollmentNumber());
        assertEquals(3, savedStudent.getSemester());
    }
}
