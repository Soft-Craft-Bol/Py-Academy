# Documentación de Arquitectura Frontend

## 📐 Arquitectura General

### **Enfoque Modular con Context API**
- **Estructura Feature-Based**: Organización por funcionalidades autocontenidas
- **Atomic Design**: Componentes UI jerárquicos (átomos → organismos)
- **Gestión de Estado**: Context API para estado compartido + React Query para data fetching

## 📁 Estructura del Proyecto

```
src/
│
├── app/                      # Configuración central
│   ├── contexts/             # Contextos globales (auth, theme)
│   ├── config/               # Configuraciones (axios, routes)
│   └── providers/            # Proveedores combinados
│
├── features/                 # Módulos de funcionalidad
│   ├── code-editor/          # Editor de Python
│   │   ├── components/       # Componentes específicos
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── contexts/         # Contexto del feature
│   │   └── services/         # Lógica de negocio
│   │
│   ├── exercises/            # Sistema de ejercicios
│   ├── video-lessons/        # Lecciones en video
│   └── realtime-chat/        # Chat con IA
│
├── shared/                   # Recursos compartidos
│   ├── ui/                   # Componentes UI puros
│   │   ├── atoms/            # Elementos básicos
│   │   ├── molecules/        # Componentes compuestos
│   │   └── organisms/        # Secciones complejas
│   │
│   ├── api/                  # Configuración de axios
│   ├── hooks/                # Hooks reutilizables
│   └── utils/                # Funciones helper
│
└── pages/                    # Componentes de página
    ├── Home/                 # Página de inicio
    └── Dashboard/            # Panel principal
```

## 📝 Estándares de Codificación

### **1. Convenciones de Nomenclatura**
| Tipo                  | Convención               | Ejemplo                     |
|-----------------------|--------------------------|-----------------------------|
| Carpetas              | kebab-case               | `video-lessons`             |
| Componentes           | PascalCase               | `CodeEditor.jsx`            |
| Hooks                 | useCamelCase             | `usePythonExecution.js`     |
| Contextos             | CamelCase + .context     | `auth.context.jsx`          |
| Servicios/Helpers     | camelCase + .service     | `exercise.service.js`       |

### **2. Documentación**
- **Comentarios JSDoc** para funciones complejas:
  ```javascript
  /**
   * Ejecuta código Python en el servidor
   * @param {string} code - Código a ejecutar
   * @returns {Promise<Object>} Resultado de ejecución
   * @throws {Error} Cuando falla la ejecución
   */
  async function executePython(code) {...}
  ```
- **README.md** en cada feature explicando:
  - Propósito
  - Dependencias
  - Estructura interna
  - Ejemplo de uso

### **3. Formateo de Código**
- **Prettier** con configuración estándar
- **ESLint** con reglas de Airbnb
- **Archivo .editorconfig** para consistencia

### **4. Manejo de Errores**
- **Estrategia unificada**:
  - Errores de API: Interceptores de axios
  - Errores UI: Componentes de error boundaries
  - Logging: Servicio centralizado

### **5. Control de Versiones**
- **Git Flow** adaptado:
  - `main`: Producción
  - `develop`: Integración
  - `feature/`: Nuevas funcionalidades
- **Convención de commits**:
  - `feat:` Nueva característica
  - `fix:` Corrección de bugs
  - `docs:` Cambios en documentación

## 🔄 Flujo de Datos

### **Con React Query + Axios**
1. **Capa de Servicio**:
   ```javascript
   // features/exercises/services/exercise.service.js
   import api from '../../../shared/api/axios.config';
   
   export const fetchExercises = async (level) => {
     const response = await api.get(`/exercises?level=${level}`);
     return response.data;
   };
   ```

2. **Capa de Hook**:
   ```javascript
   // features/exercises/hooks/useExercises.js
   import { useQuery } from 'react-query';
   import { fetchExercises } from '../services/exercise.service';
   
   export const useExercises = (level) => {
     return useQuery(['exercises', level], () => fetchExercises(level));
   };
   ```

3. **Consumo en Componente**:
   ```javascript
   function ExerciseList() {
     const { data, isLoading } = useExercises('beginner');
     // Renderizado...
   }
   ```

## 🧩 Patrones Clave

### **1. Composición de Proveedores**
```javascript
// app/providers/index.js
export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### **2. Contextos Específicos**
- **Contextos globales**: Autenticación, Tema UI
- **Contextos por feature**: Estado del editor, progreso de lecciones

### **3. Atomic Design Implementado**
| Nivel        | Ubicación              | Responsabilidad             |
|--------------|------------------------|-----------------------------|
| Átomos       | shared/ui/atoms        | Inputs, Botones básicos     |
| Moléculas    | shared/ui/molecules    | Cards, Formularios simples  |
| Organismos   | shared/ui/organisms    | Secciones complejas         |
| Templates    | features/[feature]      | Páginas/composiciones       |

## 🚀 Workflow de Desarrollo

1. **Crear feature branch** desde `develop`
2. **Implementar** siguiendo estructura modular
3. **Documentar** componente/servicio
4. **Validar** con ESLint/Prettier
5. **Subir cambios** con commit descriptivo
6. **Crear PR** para revisión

## ✅ Criterios de Aceptación

1. **Consistencia estructural** en todos los módulos
2. **Documentación completa** de componentes clave
3. **Pruebas básicas** para lógica crítica
4. **Cumplimiento** de convenciones de nombrado
5. **Manejo de errores** unificado en toda la app

Esta arquitectura ofrece escalabilidad, mantenibilidad y claridad en el código, aprovechando Context API para estado global y React Query para gestión eficiente de datos asíncronos.



---

# 📘 Documentación de Arquitectura Backend

## 🔧 Tecnologías

* ⚙️ Java 17 + Spring Boot 3 (Java modules)
* 🧱 PostgreSQL
* 📦 Docker + Docker Compose
* ✏️ Arquitectura: **Hexagonal (Ports & Adapters)**

---
## 📐 Arquitectura Hexagonal (aplicada en ambos frameworks)
---

## 📁 Estructura de Carpetas por Módulos (multi-módulo limpio)

```
/backend/
├── common/                    # Clases utilitarias compartidas
├── inscripciones/             # Módulo de inscripciones
│   ├── application/           # Casos de uso
│   ├── domain/                # Entidades, interfaces (puertos)
│   ├── infrastructure/        # Adaptadores: DB, APIs externas
│   └── interfaces/            # Controladores REST (Spring / FastAPI)
├── chatbot/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── interfaces/
├── evaluaciones/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── interfaces/
├── simuladores/
│   ├── ...
├── build.gradle / pom.xml
└── docker-compose.yml
```

---

## ✨ Estándares de Codificación

### 🔡 Variables y Archivos

| Tipo              | Convención                   | Ejemplo                 |
| ----------------- | ---------------------------- | ----------------------- |
| Clases Java       | `PascalCase`                 | `PracticaService`       |
| Interfaces        | `IPrefijo` o uso sin prefijo | `PruebaRepository`      |
| Métodos/funciones | `camelCase`                  | `calcularResultado()`   |
| Variables         | `camelCase`                  | `codigoEstudiante`      |
| Archivos Python   | `snake_case.py`              | `correccion_service.py` |

---

### 🌐 Endpoints REST

| Recurso            | Método | Endpoint                       | Acción                         |
| ------------------ | ------ | ------------------------------ | ------------------------------ |
| Prácticas          | `GET`  | `/api/v1/practicas`               | Listar prácticas               |
|                    | `POST` | `/api/v1/practicas/{id}/corregir` | Corregir código enviado        |
| Chatbot            | `POST` | `/api/v1/chatbot/preguntar`       | Enviar pregunta al chatbot     |
|                    | `GET`  | `/api/v1/chatbot/historial`       | Historial de conversación      |
| Material educativo | `POST` | `/api/v1/materiales/subir`        | Subir PDF, video, presentación |

---

### 🧱 Buenas prácticas

#### Spring Boot

* Cada módulo es un paquete con estructura hexagonal interna
* Usa `@Service`, `@Repository`, `@RestController` solo en capas correctas
* Implementaciones van en `infrastructure`, no directamente en `application`

---

### 🔐 Seguridad

* Autenticación: Spring Security / OAuth2 + JWT
* Roles: `ROLE_ADMIN`, `ROLE_ESTUDIANTE`, etc.
* Validación de entradas: `javax.validation` / Pydantic

---

## 🔄 Testing

| Tipo              | Framework         | Ubicación                      |
| ----------------- | ----------------- | ------------------------------ |
| Unit Tests (Java) | JUnit 5 + Mockito | `domain`, `application`        |
| Integration Test  | Spring Boot Test  | `interfaces`, `infrastructure` |

---

## 🐳 Docker Configuración del Entorno de Desarrollo

---

1. **Requisitos previos**:
   - Docker Desktop instalado
   - JDK 17

2. **Iniciar el entorno**:
   ```bash
   docker-compose up -d --build
   ```

3. **Accesos**:
   - Aplicación: http://localhost:8888/api/v1
   - DB: localhost:5432
     - Usuario: [el que configuraste en .env]
     - DB: [el nombre que configuraste en .env]

4. **Comandos útiles**:
   - Ver logs: `docker logs -f pyacademy-app-1`
   - Detener: `docker-compose down`
   - Limpiar todo: `docker-compose down -v`

