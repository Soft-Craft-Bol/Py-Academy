NOMBRE DE CARPETA FEATURE: Auth Domain Enums

DESCRIPCIÓN: EDefne los distintos roles de usuario disponibles y es utilizado en el módulo de autenticación y control de acceso

PROPÓSITO

Establecer un conjunto fijo de roles predefinidos que representan diferentes tipos de usuario para que puedan interactuar con la plataforma 

DEPENDENCIAS
No cuenta con dependencias 

ESTRUCTURA INTERNA

```features
auth/
└── domain/
    └── enums/
        ├── RoleEnum.java

EJEMPLO DE USO
UserEntity user = new UserEntity();
user.setRole(RoleEnum.ESTUDIANTE);