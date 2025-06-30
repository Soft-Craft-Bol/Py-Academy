package com.pyAcademy.pyAcademy.features.education.application.ports;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import java.util.Optional;

public interface UserRepositoryPort {
    Optional<UserEntity> findUserById(Long userId);
}