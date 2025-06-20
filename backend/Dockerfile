# Etapa 1: build
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Etapa 2: producción
FROM openjdk:17-jdk-slim
WORKDIR /app

# Cambia el nombre aquí al JAR que se genera realmente:
COPY --from=build /app/target/pyAcademy-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8888
CMD ["java", "-jar", "app.jar"]
