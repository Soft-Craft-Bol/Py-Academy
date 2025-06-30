import { BsClockHistory } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import estDatPy from '@/assets/ManageCourses/estDatPy.jpg';
import python_basico from '@/assets/ManageCourses/python_basico.jpg';
import pyWeb from '@/assets/ManageCourses/pyWeb.jpeg';

const courses = [
  {
    id: 1,
    title: 'Curso de Python Básico casdc',
    teacher: 'Ana López asd',
    imageUrl: python_basico,
    startDate: '01/06/2025',
    endDate: '01/08/2025',
    duration: '8 semanas',
    level: 'Básico',
    price: 0,
    enrolled: 12,
    maxStudents: 30,
  },
  {
    id: 2,
    title: 'Curso de Estructuras de Datos',
    teacher: 'Carlos Pérez',
    imageUrl: estDatPy,
    startDate: '05/06/2025',
    endDate: '05/09/2025',
    duration: '10 semanas',
    level: 'Intermedio',
    price: 25,
    enrolled: 20,
    maxStudents: 30,
  },
  {
    id: 3,
    title: 'Desarrollo Web',
    teacher: 'María Torres',
    imageUrl: pyWeb,
    startDate: '10/06/2025',
    endDate: '10/09/2025',
    duration: '12 semanas',
    level: 'Avanzado',
    price: 50,
    enrolled: 15,
    maxStudents: 25,
  },
];

function CoursesPage() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/student/curso/${id}`);
  };

  return (
    <section className="px-4 md:px-10 py-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Mis Cursos</h2>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCardClick(course.id)}
            className="cursor-pointer bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img src={course.imageUrl} alt={course.title} className="h-48 w-full object-cover" />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Profesor: <span className="font-medium">{course.teacher}</span>
              </p>

              <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2">
                  <BsClockHistory />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUserGraduate />
                  <span>
                    {course.enrolled}/{course.maxStudents} estudiantes
                  </span>
                </div>
                <span>
                  Nivel: <strong>{course.level}</strong>
                </span>
                <span>
                  Precio:{' '}
                  {course.price === 0 ? (
                    <span className="text-green-600 font-bold">Gratis</span>
                  ) : (
                    <span className="font-bold">${course.price}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoursesPage;
