NOMBRE DE CARPETA FEATURE: Auth Domain Repository Implementation

DESCRIPCIÓN:
1.- RoleRepository: Clase de implementación que puede utilizarse como contenedor para lógica de negocio personalizada o compleja relacionada a los roles (RoleEntity) que no puede resolverse fácilmente con IRoleRepository.

2.- UserRepository: Clase destinada a extender la funcionalidad de acceso a datos de los usuarios (UserEntity), permitiendo incluir métodos avanzados que exceden las capacidades de IUserRepository.

3.- Ambas clases están vacías por ahora, pero siguen el patrón de separación entre abstracción e implementación, y están preparadas para escalar en futuras versiones del sistema.

PROPÓSITO

1.- Proporcionar una capa de implementación para consultas complejas

2.- Mantener separada la lógica de negocio de acceso a datos

3.- Permitir la integración con otras tecnologías o estrategias de persistencia si fuese necesario

DEPENDENCIAS
1.- IRoleRepository e IUserRepository – Interfaces principales que cubren las operaciones básicas y personalizadas estándar.

2.- Spring Context (futuro) – Para inyectar EntityManager u otros beans en estas clases, cuando se amplíen.

3.- Entidades del dominio (RoleEntity, UserEntity) – Para manipular los datos específicos del sistema de autenticación.

ESTRUCTURA INTERNA

```features
auth/
└── domain/
    └── repository/
        └── implementation/
            ├── RoleRepository.java
            ├── UserRepository.java

EJEMPLO DE USO
1.- List<UserEntity> sinRoles = userRepository.findUsersWithNoRoles();
