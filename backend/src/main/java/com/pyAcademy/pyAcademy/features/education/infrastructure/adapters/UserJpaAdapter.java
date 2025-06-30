package com.pyAcademy.pyAcademy.features.education.infrastructure.adapters;

import com.pyAcademy.pyAcademy.features.auth.domain.models.UserEntity;
import com.pyAcademy.pyAcademy.features.auth.domain.repository.IUserRepository;
import com.pyAcademy.pyAcademy.features.education.application.ports.UserRepositoryPort;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserJpaAdapter implements UserRepositoryPort {

    private final IUserRepository userJpaRepository;

    public UserJpaAdapter(IUserRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public Optional<UserEntity> findUserById(Long userId) {
        return userJpaRepository.findById(userId);
    }
}