# Guía de Instalación: React + Spring Boot

Este proyecto combina **React** para el frontend y **Spring Boot** para el backend. Sigue los pasos a continuación para instalar y ejecutar la aplicación de forma local.

---

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

### Backend (Spring Boot)
- [Java 17+](https://adoptopenjdk.net/)
- [Maven 3.6+](https://maven.apache.org/)
- [Git](https://git-scm.com/)

### Frontend (React)
- [Node.js 16+ y npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone git@github.com:Soft-Craft-Bol/Py-Academy.git
cd tu-repo
```
## Crear y Ejecutar Spring Boot (Backend)

### 1. Crear proyecto Spring Boot con Spring Initializr

Opción rápida desde la web:

- Ir a: [https://start.spring.io](https://start.spring.io/)
- Configuración recomendada:
  - Project: Maven
  - Language: Java
  - Spring Boot: 3.x.x
  - Group: `com.ejemplo`
  - Artifact: `backend`
  - Dependencies: `Spring Web`, `Spring Boot DevTools`, `Spring Data JPA`, `H2 Database`

Haz clic en **"Generate"** y descomprime el archivo.

### 2. Ingresar al directorio y ejecutar

```bash
cd backend
./mvnw spring-boot:run
```

## Crear y Ejecutar React con Vite (Frontend)
1. Crear proyecto React con Vite
```bash
npm create vite@latest frontend -- --template react
```


2. Ingresar al directorio del proyecto
```bash
cd frontend
```

3. Instalar dependencias
```bash
npm install
```

4. Ejecutar aplicación React
```bash
npm run dev
La aplicación estará disponible en: http://localhost:5173
```
