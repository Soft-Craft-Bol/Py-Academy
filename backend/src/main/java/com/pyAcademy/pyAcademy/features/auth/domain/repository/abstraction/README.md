NOMBRE DE CARPETA FEATURE: Auth Domain Repository Abstraction

DESCRIPCIÓN:
1.- IRoleRepository: Repositorio para acceder y consultar datos de los roles definidos en el sistema, incluyendo búsquedas por enumeraciones de tipo RoleEnum.

2.- IUserRepository: Repositorio que gestiona las operaciones sobre los usuarios, con métodos personalizados para buscar por username, email, obtener el ID, contar usuarios por rol, y más.

PROPÓSITO

1.- Facilitar el acceso estructurado y reutilizable a los datos de roles y usuarios, con métodos específicos para obtener información relevante.

2.- Optimizar la capa de persistencia mediante consultas declarativas en lugar de implementar lógica manual.

DEPENDENCIAS
1.- Spring Data JPA (JpaRepository) – Proporciona funcionalidades CRUD y soporte para consultas declarativas.

2.- RoleEntity y UserEntity – Entidades del modelo que se manipulan desde los repositorios.

3.- RoleEnum – Enumeración utilizada como criterio de búsqueda o filtrado en varios métodos.

ESTRUCTURA INTERNA

```features
auth/
└── domain/
    └── repository/
        └── abstraction/
            ├── IRoleRepository.java
            ├── IUserRepository.java

EJEMPLO DE USO
1.- Optional<RoleEntity> adminRole = roleRepository.findByRoleEnum(RoleEnum.ADMIN);

2.- List<UserEntity> estudiantes = userRepository.findByRolesRoleEnum(RoleEnum.ESTUDIANTE);
