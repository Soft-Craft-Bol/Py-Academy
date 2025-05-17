package com.pyAcademy.pyAcademy.features.auth.domain.models;

import com.pyAcademy.pyAcademy.features.auth.domain.enums.RoleEnum;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private RoleEnum roleEnum;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "roles_permissions",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<PermissionEntity> permissions = new HashSet<>();

    // Constructores
    public RoleEntity() {
    }

    public RoleEntity(Long id, RoleEnum roleEnum, Set<PermissionEntity> permissions) {
        this.id = id;
        this.roleEnum = roleEnum;
        this.permissions = permissions;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleEnum getRoleEnum() {
        return roleEnum;
    }

    public void setRoleEnum(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }

    public Set<PermissionEntity> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<PermissionEntity> permissions) {
        this.permissions = permissions;
    }

    // Builder pattern manual
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private RoleEnum roleEnum;
        private Set<PermissionEntity> permissions;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder roleEnum(RoleEnum roleEnum) {
            this.roleEnum = roleEnum;
            return this;
        }

        public Builder permissions(Set<PermissionEntity> permissions) {
            this.permissions = permissions;
            return this;
        }

        public RoleEntity build() {
            return new RoleEntity(id, roleEnum, permissions != null ? permissions : new HashSet<>());
        }
    }
}