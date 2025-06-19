import React, { useState } from "react";
import CourseCard from "./components/CourseCard";
import pyWeb from "../../assets/ManageCourses/pyWeb.jpeg";
import estDatPy from "../../assets/ManageCourses/estDatPy.jpg";
import python_basico from "../../assets/ManageCourses/python_basico.jpg";

const initialCourses = [
  { id: 1, title: "Curso de Python Básico", description: "Aprende los fundamentos de Python desde cero.", imageUrl: python_basico },
  { id: 2, title: "Curso de Estructuras de Datos", description: "Conoce listas, pilas, colas y árboles con ejemplos prácticos.", imageUrl: estDatPy },
  { id: 3, title: "Curso de Desarrollo Web", description: "Crea aplicaciones web usando HTML, CSS y JavaScript.", imageUrl: pyWeb },
  { id: 4, title: "Curso Avanzado de Estructuras de Datos", description: "Profundiza en estructuras con ejemplos prácticos.", imageUrl: estDatPy },
  { id: 5, title: "Curso Avanzado de Estructuras de Datos", description: "Profundiza en estructuras con ejemplos prácticos.", imageUrl: estDatPy }
];

const ManageCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleViewMore = (id) => alert("Detalles del curso " + id);

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
          onClick={() => setShowCreateModal(true)}
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

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Crear Nuevo Curso</h3>

            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 mb-3 border rounded placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white"
              value={newCourseData.title}
              onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })}
            />
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Descripción</label>
            <textarea
              placeholder="Descripción"
              className="w-full p-2 mb-3 border rounded placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white"
              value={newCourseData.description}
              onChange={(e) => setNewCourseData({ ...newCourseData, description: e.target.value })}
            />

            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Imagen (PNG, JPG, JPEG)</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    setNewCourseData((prev) => ({ ...prev, imageUrl: reader.result }));
                  reader.readAsDataURL(file);
                }
              }}
/>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!newCourseData.title || !newCourseData.description) {
                    alert("Completa título y descripción");
                    return;
                  }
                  const newCourse = {
                    id: courses.length + 1,
                    ...newCourseData,
                  };
                  setCourses([...courses, newCourse]);
                  setNewCourseData({ title: "", description: "", imageUrl: "" });
                  setShowCreateModal(false);
                }}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCourses;
