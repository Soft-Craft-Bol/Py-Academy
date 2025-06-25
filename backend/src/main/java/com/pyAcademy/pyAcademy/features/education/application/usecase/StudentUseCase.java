package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.IUserRepository;
import com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity;
import com.pyAcademy.pyAcademy.features.education.domain.repository.StudentRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.StudentRegisterData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentUseCase {
    @Autowired
    private IUserRepository userRepository;
    @Autowired private StudentRepository studentRepository;

    public void registerStudent(UserEntity baseUser, StudentRegisterData data) {
        StudentEntity student = new StudentEntity();
        student.setId(baseUser.getId());
        student.setUsername(baseUser.getUsername());
        student.setPassword(baseUser.getPassword());
        student.setEmail(baseUser.getEmail());
        student.setTelefono(baseUser.getTelefono());
        student.setFirstName(baseUser.getFirstName());
        student.setLastName(baseUser.getLastName());
        student.setPhoto(baseUser.getPhoto());
        student.setRoles(baseUser.getRoles());
        student.setAccountNonExpired(baseUser.isAccountNonExpired());
        student.setAccountNonLocked(baseUser.isAccountNonLocked());
        student.setCredentialsNonExpired(baseUser.isCredentialsNonExpired());
        student.setEnabled(baseUser.isEnabled());

        student.setEnrollmentNumber(data.enrollmentNumber());
        student.setAcademicProgram(data.academicProgram());
        student.setSemester(data.semester());

        studentRepository.save(student);
    }
}
