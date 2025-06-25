package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.IUserRepository;
import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import com.pyAcademy.pyAcademy.features.education.domain.repository.TeacherRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.request.TeacherRegisterData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherUseCase {
    @Autowired
    private IUserRepository userRepository;
    @Autowired private TeacherRepository teacherRepository;


    public void registerTeacher(UserEntity baseUser, TeacherRegisterData data) {
        TeacherEntity teacher = new TeacherEntity();
        teacher.setId(baseUser.getId());
        teacher.setUsername(baseUser.getUsername());
        teacher.setPassword(baseUser.getPassword());
        teacher.setEmail(baseUser.getEmail());
        teacher.setTelefono(baseUser.getTelefono());
        teacher.setFirstName(baseUser.getFirstName());
        teacher.setLastName(baseUser.getLastName());
        teacher.setPhoto(baseUser.getPhoto());
        teacher.setRoles(baseUser.getRoles());
        teacher.setAccountNonExpired(baseUser.isAccountNonExpired());
        teacher.setAccountNonLocked(baseUser.isAccountNonLocked());
        teacher.setCredentialsNonExpired(baseUser.isCredentialsNonExpired());
        teacher.setEnabled(baseUser.isEnabled());

        teacher.setDepartment(data.department());
        teacher.setSpecialization(data.specialization());
        teacher.setAcademicDegree(data.academicDegree());


        teacherRepository.save(teacher);
    }
}
