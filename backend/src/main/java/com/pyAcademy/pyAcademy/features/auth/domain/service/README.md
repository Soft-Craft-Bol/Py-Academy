NOMBRE DE CARPETA FEATURE: Auth Domain Repository Service

DESCRIPCIÓN:
1.- Es el servicio principal que implementa la interfaz UserDetailsService de Spring Security.

PROPÓSITO

Autentica los usuario mediante Spring Security, validando correo y contraseña, registra nuevos usuarios asignando roles y codificando la contraseña, integra con cloudinary para almacenar la imagen del perfil, Genera tokens para sesiones autenticadas, implementacipn del método requerido por UserDetailsService para el login.

DEPENDENCIAS
IUserRepository.-	Acceso a usuarios desde la base de datos.
IRoleRepository.-	Acceso a roles y permisos asociados.
JwtUtils.-	Utilidad para crear y validar tokens JWT.
CloudinaryService.-	Servicio de subida de imágenes a Cloudinary.
PasswordEncoder.-	Codificación y verificación segura de contraseñas.
AuthCreateUserRequest / AuthLoginRequest.-	DTOs para el registro e inicio de sesión.
AuthResponse.-	Respuesta estándar del sistema de autenticación.
UserEntity / RoleEntity.-	Entidades del modelo de autenticación.
RoleEnum.-	Enumeración que define los posibles roles.

ESTRUCTURA INTERNA

```features
auth/
└── domain/
    └── repository/
        └── service/
            ├── UserDetailServiceImpl.java

EJEMPLO DE USO
public ResponseEntity<AuthResponse> register(@RequestBody AuthCreateUserRequest request) {
    return ResponseEntity.ok(userDetailServiceImpl.createUser(request));
}