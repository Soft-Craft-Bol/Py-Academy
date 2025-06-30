import { useNavigate } from 'react-router-dom';

function CourseCardStudent({ course }) {
  const navigate = useNavigate();

  const { course: courseDetails, teacher } = course;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <img
        src={courseDetails.imageUrl}
        alt={courseDetails.name}
        className="w-full h-80 object-cover"
      />

      <div className="p-4 text-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-1">{courseDetails.name}</h3>

        {/* Mostramos el nombre del profesor */}
        <p className="text-sm mb-1">
          Docente: {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No asignado'}
        </p>

        <p className="text-sm mb-1">
          Inicio: {courseDetails.startDate} | Fin: {courseDetails.endDate}
        </p>

        <p className="text-sm mb-1">
          Duración: {courseDetails.durationInHours} horas
        </p>

        <p className="text-sm mb-1">Nivel: {courseDetails.level}</p>

        <p className="text-sm mb-1">Precio: ${courseDetails.price}</p>

        <p className="text-sm mb-1">
          Estudiantes: 0/{courseDetails.maxStudents} {/* Asumo que enrolled vendrá del backend */}
        </p>

        <button
          onClick={() =>
            navigate(`/curso/${courseDetails.id}`, {
              state: {
                courseDetails,
              },
            })
          }
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Ver más
        </button>
      </div>
    </div>
  );
}

export default CourseCardStudent;
