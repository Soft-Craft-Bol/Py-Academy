import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import estDatPy from '../../assets/ManageCourses/estDatPy.jpg';
import python_basico from '../../assets/ManageCourses/python_basico.jpg';
import pyWeb from '../../assets/ManageCourses/pyWeb.jpeg';

import CourseCard from './components/CourseCard';

const initialCourses = [
  {
    id: 1,
    title: 'Curso de Python Básico',
    description: 'Aprende los fundamentos de Python desde cero.',
    imageUrl: python_basico,
  },
  {
    id: 2,
    title: 'Curso de Estructuras de Datos',
    description: 'Conoce listas, pilas, colas y árboles con ejemplos prácticos.',
    imageUrl: estDatPy,
  },
  {
    id: 3,
    title: 'Curso de Desarrollo Web',
    description: 'Crea aplicaciones web usando HTML, CSS y JavaScript.',
    imageUrl: pyWeb,
  },
  {
    id: 4,
    title: 'Curso Avanzado de Estructuras de Datos',
    description: 'Profundiza en estructuras con ejemplos prácticos.',
    imageUrl: estDatPy,
  },
  {
    id: 5,
    title: 'Curso Avanzado de Estructuras de Datos',
    description: 'Profundiza en estructuras con ejemplos prácticos.',
    imageUrl: estDatPy,
  },
];

function ManageCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const handleViewMore = (id) => alert('Detalles del curso ' + id);

  const handleEditCourse = (id, updatedData) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, ...updatedData } : course))
    );
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50 min-h-screen dark:bg-gradient-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mis cursos creados</h2>
        <button
          //onClick={() => setShowCreateModal(true)}
          onClick={() => navigate("/teacher/create-course")}
          className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          Crear curso
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4">
        {courses.map((course) => (
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            onEdit={(updatedData) => handleEditCourse(course.id, updatedData)}
            onDelete={() => handleDeleteCourse(course.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default ManageCourses;
