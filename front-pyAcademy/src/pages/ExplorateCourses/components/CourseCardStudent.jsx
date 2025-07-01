import { getUser } from '@/features/auth/utils/authCookies';
import { useInscribirseCurso } from '@/shared/hooks/useInscribirseCurso';

function CourseCardStudent({ course }) {
  const currentUser = getUser();
  const { mutate, isLoading } = useInscribirseCurso();

  const { course: courseDetails, teacher } = course;

  console.log('Los Detalles del curso es', courseDetails);

  const handleEnroll = () => {
    console.log('🧠 currentUser:', currentUser);
    console.log('📘 courseDetails:', courseDetails);
    if (!currentUser?.id || !courseDetails?.id) {
      console.error('No se puede inscribir: IDs inválidos', {
        studentId: currentUser?.id,
        courseId: courseDetails?.id,
      });
      return;
    }
    mutate({
      studentId: currentUser.id,
      courseId: courseDetails.id,
    });
  };

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

        <p className="text-sm mb-1">Duración: {courseDetails.durationInHours} horas</p>

        <p className="text-sm mb-1">Nivel: {courseDetails.level}</p>

        <p className="text-sm mb-1">Precio: ${courseDetails.price}</p>

        <p className="text-sm mb-1">
          Estudiantes: 0/{courseDetails.maxStudents} {/* Asumo que enrolled vendrá del backend */}
        </p>

        <button
          onClick={handleEnroll}
          disabled={isLoading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Inscribiéndose...' : 'Tomar curso'}
        </button>
      </div>
    </div>
  );
}

export default CourseCardStudent;
