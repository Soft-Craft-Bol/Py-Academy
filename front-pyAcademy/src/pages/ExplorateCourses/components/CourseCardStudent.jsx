import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCardStudent = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-4 text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        <p className="text-sm mb-1">Docente: {course.teacher}</p>
        <p className="text-sm mb-1">Inicio: {course.startDate} | Fin: {course.endDate}</p>
        <p className="text-sm mb-1">Duración: {course.duration}</p>
        <p className="text-sm mb-1">Nivel: {course.level}</p>
        <p className="text-sm mb-1">Precio: ${course.price}</p>
        <p className="text-sm mb-1">Estudiantes: {course.enrolled}/{course.maxStudents}</p>
        <button
          onClick={() => navigate(`/curso/${course.id}`)}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default CourseCardStudent;
