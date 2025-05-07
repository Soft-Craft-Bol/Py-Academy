package com.pyAcademy.pyAcademy.user.domain.repository.abstraction;

import com.pyAcademy.pyAcademy.user.domain.enums.RoleEnum;
import com.pyAcademy.pyAcademy.user.domain.models.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IRoleRepository extends JpaRepository<RoleEntity, Long> {
    List<RoleEntity> findRoleEntitiesByRoleEnumIn(List<RoleEnum> roleNames);
    Optional<RoleEntity> findByRoleEnum(RoleEnum roleEnum);
}
