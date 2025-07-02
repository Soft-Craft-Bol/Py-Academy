package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.education.application.ports.UserRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetUserDetailsUseCase {
    private final UserRepositoryPort userRepositoryPort;

    public GetUserDetailsUseCase(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    public Optional<UserEntity> execute(Long userId) {
        return userRepositoryPort.findUserById(userId);
    }
}