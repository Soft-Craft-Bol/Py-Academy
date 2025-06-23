NOMBRE DE CARPETA FEATURE: Analytics Domain Models

DESCRIPCIÓN: Este paquete contiene los modelos del dominio relacionados con el análisis del rendimiento y progreso de los estudiantes en la plataforma PyAcademy. Ahora nos enfocaremos en los dos archivos que se encuentran dentro del feature.

PROPÓSITO

1.- PerformanceMetricsEntity.java.- Representa las métricas de rendimiento diario del estudiante en un curso determinado. Útil para generar análisis detallado del desempeño académico individual y grupal.

2.-StudentProgressEntity.java.- Almacena el progreso general de un estudiante, enfocado en el estado de finalización del curso. Permmitiendo evaluar si el estudiante completo su formación y en que momento, aportando datos clave para estadisticas y reportes de avance.

DEPENDENCIAS
1.- PerformanceMetricsEntity.java
Las dependencias son las siguientes:

jakarta.persistence.*: Anotaciones para mapear la clase como entidad de JPA (@Entity, @Table, @Id, etc.).
jakarta.validation.constraints.*: Validaciones declarativas como @NotNull, @Min, @DecimalMin, @AssertTrue, entre otras.
java.util.Date: Para el manejo de fechas asociadas a la métrica.
com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity: Para la relación @ManyToOne con la entidad del estudiante.
com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity: Para relacionar la métrica con un curso específico.
com.pyAcademy.pyAcademy.features.exercises.domain.models.ExerciseSubmissionsEntity: Representa la entrega asociada a los ejercicios, usando una relación @OneToOne.

2.-  StudentProgressEntity.java
Las dependencias son las siguientes:

jakarta.persistence.*: Para mapear la clase como entidad en la base de datos.
jakarta.validation.constraints.*: Validaciones como @DecimalMin, @DecimalMax, @PastOrPresent, @AssertTrue, entre otras.
java.math.BigDecimal: Para representar porcentajes con precisión decimal.
java.sql.Timestamp: Para manejar fechas y tiempos de acceso y finalización.
com.pyAcademy.pyAcademy.features.education.domain.models.StudentEntity: Utilizado en la relación @OneToOne para vincular el progreso con un estudiante.

ESTRUCTURA INTERNA

```Features
analytics/
└── domain/
    └── models/
        ├── PerformanceMetricsEntity.java
        └── StudentProgressEntity.java

EJEMPLO DE USO
1.- PerformanceMetricsEntity.java
Se cargan las entidades relacionadas (StudentEntity, CourseEntity, y opcionalmente ExerciseSubmissionsEntity) desde sus repositorios.
Se crea un objeto PerformanceMetricsEntity y se asignan valores a sus campos.
Se guarda la entidad en la base de datos usando el repositorio performanceMetricsRepository.

2.- StudentProgressEntity.java 
Se busca el estudiante por su ID.
Se crea una nueva entidad StudentProgressEntity.
Se asignan los valores incluyendo el porcentaje de progreso, si está completado o no, fechas de último acceso y completado.
Se guarda en la base de datos con el repositorio.
También incluí un método adicional para crear un progreso típico (75.5% completado, no completado aún).