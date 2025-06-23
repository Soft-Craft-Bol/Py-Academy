NOMBRE DE CARPETA FEATURE: Auth Domain Models

DESCRIPCIÓN:
1.- PermissionEntity: Define los permisos individuales que pueden ser asignados a roles, como acciones específicas que un usuario puede realizar (por ejemplo: "VER_USUARIOS", "EDITAR_PERFILES").

2.-RoleEntity: Representa roles en el sistema (como ADMIN, ESTUDIANTE, etc.), y cada uno puede tener múltiples permisos asociados. Es un puente entre usuarios y permisos.

3.-UserEntity: Es la clase base para los usuarios del sistema. Contiene datos personales, credenciales de acceso y la asociación con uno o varios roles. Además, permite herencia para tipos de usuario especializados.

PROPÓSITO

1.- PermissionEntity: Centraliza la seguridad basada en roles y permisos

2.-RoleEntity: Permite una gestión flexible, asignando roles a usuarios y permisos a roles.

3.-UserEntity: Estandariza facilmente la estructura de usuario.

DEPENDENCIAS
1.- jakarta.persistence – Se usa para mapear entidades a tablas con JPA/Hibernate.

2.- lombok – Reduce la carga de código repetitivo con anotaciones como @Getter, @Setter, @Builder.

3.- Relaciones entre entidades – UserEntity tiene una relación con RoleEntity, y esta a su vez con PermissionEntity (modelo de relaciones muchos-a-muchos).

ESTRUCTURA INTERNA

```features
auth/
└── domain/
    └── models/
        ├── PermissionEntity.java
        ├── RoleEntity.java
        ├── UserEntity.java        

EJEMPLO DE USO
1.- PermissionEntity verCursos = PermissionEntity.builder()
    .name("VER_CURSOS")
    .build();

2.- RoleEntity estudianteRole = RoleEntity.builder()
    .name("ESTUDIANTE")
    .permissions(Set.of(verCursos))
    .build();

3.- UserEntity user = UserEntity.builder()
    .username("ana_luna")
    .email("ana@example.com")
    .password("encrypted_pass")
    .enabled(true)
    .roles(Set.of(estudianteRole))
    .build();