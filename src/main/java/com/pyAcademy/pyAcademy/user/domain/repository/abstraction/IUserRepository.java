package com.pyAcademy.pyAcademy.user.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.user.domain.enums.RoleEnum;
import com.pyAcademy.pyAcademy.user.domain.models.RoleEntity;
import com.pyAcademy.pyAcademy.user.domain.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IUserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByUsername(String username);
    //get id of user by username
    @Query("SELECT u.id FROM UserEntity u WHERE u.username = :username")
    Long findIdByUsername(String username);

    List<UserEntity> findAll();
    void deleteById(long id);
    long countByRoles(RoleEntity role);
    @Query("SELECT u FROM UserEntity u JOIN u.roles r WHERE r.roleEnum = :roleEnum")
    List<UserEntity> findByRolesRoleEnum(RoleEnum roleEnum);
}
