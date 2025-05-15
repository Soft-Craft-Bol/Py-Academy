import React from "react";
import crearImg from "../../assets/ManageCourses/crear.png";
import editarImg from "../../assets/ManageCourses/editar.png";
import eliminarImg from "../../assets/ManageCourses/eliminar.png";
import CourseCard from "../../pages/ManageCourses/components/CourseCard";
import pyWeb from "../../assets/ManageCourses/pyWeb.jpeg";
import estDatPy from "../../assets/ManageCourses/estDatPy.jpg";
import python_basico from "../../assets/ManageCourses/python_basico.jpg";

const ManageCourses = () => {
  const handleViewMore = () => {
    alert("Detalles del curso...");
  };

  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        Gestión de Cursos
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Crea, edita o elimina tus cursos fácilmente desde aquí.
      </p>

      {/* Crear, Editar, Eliminar */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
          <img src={crearImg} alt="Crear curso" className="h-40 mb-4 object-contain" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Crear Curso</h3>
          <p className="text-gray-600 text-sm mb-4">
            Diseña nuevos cursos para tus estudiantes de forma rápida y sencilla.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition">
            Crear ahora
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
          <img src={editarImg} alt="Editar curso" className="h-40 mb-4 object-contain" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Editar Curso</h3>
          <p className="text-gray-600 text-sm mb-4">
            Actualiza el contenido de tus cursos según lo necesites.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition">
            Editar ahora
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
          <img src={eliminarImg} alt="Eliminar curso" className="h-40 mb-4 object-contain" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Eliminar Curso</h3>
          <p className="text-gray-600 text-sm mb-4">
            Elimina cursos que ya no están activos en la plataforma.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition">
            Eliminar ahora
          </button>
        </div>
      </div>

      {/* Mis cursos creados */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Mis cursos creados
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <CourseCard
          title="Curso de Python Básico"
          description="Aprende los fundamentos de Python desde cero."
          imageUrl={python_basico}
          onViewMore={handleViewMore}
        />
        <CourseCard
          title="Curso de Estructuras de Datos"
          description="Conoce listas, pilas, colas y árboles con ejemplos prácticos."
          imageUrl={estDatPy}
          onViewMore={handleViewMore}
        />
        <CourseCard
          title="Curso de Desarrollo Web"
          description="Crea aplicaciones web usando HTML, CSS y JavaScript."
          imageUrl={pyWeb}
          onViewMore={handleViewMore}
        />
      </div>
    </section>
  );
};

export default ManageCourses;
