# Build stage
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Variables de entorno (sobrescriben application.properties)
ENV SPRING_DATASOURCE_URL=${DB_URL}
ENV SPRING_DATASOURCE_USERNAME=${DB_USER}
ENV SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
ENV CLOUDINARY_CLOUD_NAME=${CLOUD_NAME}
ENV CLOUDINARY_API_KEY=${API_KEY}
ENV CLOUDINARY_API_SECRET=${API_SECRET}

EXPOSE 8888
ENTRYPOINT ["java", "-jar", "app.jar"]