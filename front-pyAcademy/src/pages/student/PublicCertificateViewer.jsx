import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetallesUser, getCourseByStudent } from '@/shared/api/api';
import CertificateLogo from '@/assets/CertificateLogo.png';
import EjemploFirma from '@/assets/img/EjemploFirma.png';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function PublicCertificateViewer() {
  const { userId, courseId } = useParams();
  const navigate = useNavigate();

  // Obtener datos del estudiante
  const {
    data: student,
    isLoading: loadingStudent,
    isError: errorStudent,
    error: studentError
  } = useQuery({
    queryKey: ['studentDetails', userId],
    queryFn: () => getDetallesUser(userId),
  });

  

  // Obtener cursos del estudiante
  const {
    data: courses,
    isLoading: loadingCourses,
    isError: errorCourses,
    error: coursesError
  } = useQuery({
    queryKey: ['studentCourses', userId],
    queryFn: () => getCourseByStudent(userId),
  });

  if (loadingStudent || loadingCourses) {
    return <LoadingSpinner />;
  }

  if (errorStudent || errorCourses) {
    return <ErrorMessage message={errorStudent ? studentError.message : coursesError.message} />;
  }

  // Buscar el curso específico si hay un courseId en los parámetros
  const selectedCourse = courseId
    ? courses?.find(course => course.id === parseInt(courseId))
    : null;

  // Si estamos en modo de certificado específico pero no encontramos el curso
  if (courseId && !selectedCourse) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Curso no encontrado para este estudiante</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Volver
        </button>
      </div>
    );
  }

  // Formatear fecha en español
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {courseId ? (
        // Vista de certificado individual
        <CertificateView
          student={student}
          course={selectedCourse}
          formatDate={formatDate}
        />
      ) : (
        // Listado de cursos completados para generar certificados
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis Certificados</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.image || '/default-course.jpg'}
                  alt={course.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{course.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                  <div className="mt-3 text-sm text-gray-700">
                    <p>Completado: {formatDate(course.endDate)}</p>
                    <p>Duración: {course.durationInHours} horas</p>
                  </div>
                  <button
                    onClick={() => navigate(`/certificate/${userId}/${course.id}`)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Ver Certificado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para mostrar el certificado individual
function CertificateView({ student, course, formatDate }) {
  const certificateId = `cert-${course.id}-${student.id}`;

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-white text-black min-h-screen">
      <div
        className="w-full max-w-5xl aspect-[1122/794] bg-white border border-gray-300 p-6 shadow-2xl rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-start mb-6">
          <img src={CertificateLogo} alt="Logo" className="w-32 sm:w-40 h-auto" />
          <div className="text-right text-sm text-gray-500">ID: {certificateId}</div>
        </div>

        <h2 className="text-xl text-gray-600 font-semibold mb-2 tracking-widest">CERTIFICADO</h2>
        <p className="text-gray-700 mb-6 text-base">El presente documento se entrega a:</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
          {student.firstName} {student.lastName}
        </h1>
        <p className="text-gray-700 mb-2 text-base">Por completar con éxito el curso:</p>

        <div className="border border-blue-200 rounded-md p-4 bg-blue-50 mb-4">
          <h3 className="text-lg font-bold text-blue-900">{course.name}</h3>
          <p className="text-sm text-blue-800 mt-1">{course.description}</p>
        </div>

        <ul className="text-sm text-gray-700 mb-6 space-y-1">
          <li>
            📘 <strong>{course.durationInHours}</strong> Horas de capacitación
          </li>
          <li>
            📅 <strong>{formatDate(course.endDate)}</strong> (Fecha de finalización)
          </li>
          <li>
            🎓 <strong>{course.level}</strong> (Nivel del curso)
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-end gap-12 mt-10">
          {['Vladimir Costas', 'Leticia Blanco'].map((name) => (
            <div key={name} className="text-center">
              <div className="flex flex-col items-center">
                <img src={EjemploFirma} alt="Firma" className="h-12 mb-1 object-contain" />
                <div className="h-[1px] bg-black w-40 mb-1"></div>
                <p className="font-semibold">{name}</p>
                <p className="text-xs">Docente</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Imprimir Certificado
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Volver a mis certificados
        </button>
      </div>
    </div>
  );
}

export default PublicCertificateViewer;
