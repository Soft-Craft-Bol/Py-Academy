package com.pyAcademy.pyAcademy.features.education.infrastructure.rest;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.education.application.usecase.GetUserDetailsUseCase;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final GetUserDetailsUseCase getUserDetailsUseCase;

    public UserController(GetUserDetailsUseCase getUserDetailsUseCase) {
        this.getUserDetailsUseCase = getUserDetailsUseCase;
    }

    @GetMapping("/{userId}")
    public Object getUserDetails(@PathVariable Long userId) {
        return getUserDetailsUseCase.execute(userId)
                .map(user -> {
                    if (user instanceof StudentEntity) {
                        return mapStudentToDto((StudentEntity) user);
                    } else if (user instanceof TeacherEntity) {
                        return mapTeacherToDto((TeacherEntity) user);
                    }
                    return mapUserToDto(user);
                })
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private StudentDetailsResponse mapStudentToDto(StudentEntity student) {
        return new StudentDetailsResponse(
                student.getId(),
                student.getUsername(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getTelefono(),
                student.getPhoto(),
                "ESTUDIANTE",
                student.getEnrollmentNumber(),
                student.getAcademicProgram(),
                student.getSemester(),
                student.getProgressSummary()
        );
    }

    private TeacherDetailsResponse mapTeacherToDto(TeacherEntity teacher) {
        return new TeacherDetailsResponse(
                teacher.getId(),
                teacher.getUsername(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getEmail(),
                teacher.getTelefono(),
                teacher.getPhoto(),
                "MAESTRO",
                teacher.getDepartment(),
                teacher.getSpecialization(),
                teacher.getAcademicDegree()
        );
    }

    private UserDetailsResponse mapUserToDto(UserEntity user) {
        UserDetailsResponse response = new UserDetailsResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setTelefono(user.getTelefono());
        response.setPhoto(user.getPhoto());
        response.setUserType("USER");
        return response;
    }
}