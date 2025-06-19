import React from "react";
import CourseCardStudent from "./components/CourseCardStudent";
import pyWeb from "../../assets/ManageCourses/pyWeb.jpeg";
import estDatPy from "../../assets/ManageCourses/estDatPy.jpg";
import python_basico from "../../assets/ManageCourses/python_basico.jpg";

const courses = [
  {
    id: 1,
    title: "Curso de Python Básico",
    teacher: "Ana López",
    imageUrl: python_basico,
    startDate: "01/06/2025",
    endDate: "01/08/2025",
    duration: "8 semanas",
    level: "Básico",
    price: 0,
    enrolled: 12,
    maxStudents: 30,
  },
  {
    id: 2,
    title: "Curso de Estructuras de Datos",
    teacher: "Carlos Pérez",
    imageUrl: estDatPy,
    startDate: "05/06/2025",
    endDate: "05/09/2025",
    duration: "10 semanas",
    level: "Intermedio",
    price: 25,
    enrolled: 20,
    maxStudents: 30,
  },
  {
    id: 3,
    title: "Desarrollo Web",
    teacher: "María Torres",
    imageUrl: pyWeb,
    startDate: "10/06/2025",
    endDate: "10/09/2025",
    duration: "12 semanas",
    level: "Avanzado",
    price: 50,
    enrolled: 15,
    maxStudents: 25,
  },
  {
    id: 4,
    title: "Introducción a JavaScript",
    teacher: "Luis Fernández",
    imageUrl: pyWeb,
    startDate: "15/06/2025",
    endDate: "15/08/2025",
    duration: "8 semanas",
    level: "Básico",
    price: 20,
    enrolled: 10,
    maxStudents: 30,
  },
  {
    id: 5,
    title: "Fundamentos de Base de Datos",
    teacher: "Laura Gómez",
    imageUrl: estDatPy,
    startDate: "20/06/2025",
    endDate: "20/09/2025",
    duration: "12 semanas",
    level: "Intermedio",
    price: 30,
    enrolled: 18,
    maxStudents: 30,
  },
  {
    id: 6,
    title: "Algoritmos y Programación",
    teacher: "José Ramírez",
    imageUrl: python_basico,
    startDate: "25/06/2025",
    endDate: "25/08/2025",
    duration: "8 semanas",
    level: "Intermedio",
    price: 0,
    enrolled: 22,
    maxStudents: 30,
  },
  {
    id: 7,
    title: "Python para Ciencia de Datos",
    teacher: "Andrea Salinas",
    imageUrl: estDatPy,
    startDate: "01/07/2025",
    endDate: "01/10/2025",
    duration: "12 semanas",
    level: "Avanzado",
    price: 40,
    enrolled: 16,
    maxStudents: 25,
  },
  {
    id: 8,
    title: "Diseño de Interfaces con Figma",
    teacher: "Manuel Herrera",
    imageUrl: pyWeb,
    startDate: "05/07/2025",
    endDate: "05/09/2025",
    duration: "8 semanas",
    level: "Básico",
    price: 15,
    enrolled: 14,
    maxStudents: 30,
  },
  {
    id: 9,
    title: "Backend con Node.js",
    teacher: "Carmen Rivas",
    imageUrl: python_basico,
    startDate: "10/07/2025",
    endDate: "10/10/2025",
    duration: "12 semanas",
    level: "Avanzado",
    price: 60,
    enrolled: 12,
    maxStudents: 25,
  },
  {
    id: 10,
    title: "Git y Control de Versiones",
    teacher: "Fernando Ruiz",
    imageUrl: estDatPy,
    startDate: "15/07/2025",
    endDate: "15/08/2025",
    duration: "4 semanas",
    level: "Básico",
    price: 10,
    enrolled: 25,
    maxStudents: 30,
  },
];


const StudentCourses = () => {
  return (
    <section className="px-4 md:px-10 py-12 min-h-screen bg-gray-50 dark:bg-gradient-1">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Cursos Disponibles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCardStudent key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default StudentCourses;
