import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, getToken } from '@/features/auth/utils/authCookies';
import { api } from '@/shared/api/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const currentUser = getUser();
  const isAuthenticated = !!getToken();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data);

        // Verificar si el usuario está inscrito (requiere endpoint en backend)
        if (currentUser?.id) {
          const enrollmentCheck = await api.get(`/courses/enrollments/check?userId=${currentUser.id}&courseId=${courseId}`);
          setIsEnrolled(enrollmentCheck.data.isEnrolled);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el curso');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, currentUser?.id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/register', { state: { from: `/curso/${courseId}` } });
      return;
    }

    try {
      await api.post('/courses/enrollments', {
        userId: currentUser.id,
        courseId: courseId
      });
      setIsEnrolled(true);
      // Mostrar mensaje de éxito
    } catch (err) {
      setError(err.response?.data?.message || 'Error al inscribirse en el curso');
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-4xl mx-auto mt-8">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Curso no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-1 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Portada del curso */}
        <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={course.course.imageUrl}
            alt={course.course.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{course.course.name}</h1>
              <p className="text-gray-200 mt-2">{course.course.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información principal */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Descripción del curso</h2>
              <p className="text-gray-600 dark:text-gray-300">{course.course.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Lo que aprenderás</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningObjectives?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                )) || (
                  <li className="text-gray-500 dark:text-gray-400">No se han especificado objetivos de aprendizaje</li>
                )}
              </ul>
            </div>
          </div>

          {/* Sidebar con información del curso */}
          <div className="space-y-6">
            {/* Información del profesor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Instructor</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={course.teacher.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={`${course.teacher.firstName} ${course.teacher.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {course.teacher.firstName} {course.teacher.lastName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{course.teacher.email}</p>
                </div>
              </div>
            </div>

            {/* Detalles del curso */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Detalles del curso</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Nivel:</span>
                  <span className="font-medium">{course.course.level}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Duración:</span>
                  <span className="font-medium">{course.course.durationInHours} horas</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Inicio:</span>
                  <span className="font-medium">{formatDate(course.course.startDate)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Fin:</span>
                  <span className="font-medium">{formatDate(course.course.endDate)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Estudiantes:</span>
                  <span className="font-medium">{course.enrolledStudents || 0}/{course.course.maxStudents}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Precio:</span>
                  <span className="font-bold text-lg">
                    {course.course.price === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      `$${course.course.price.toFixed(2)}`
                    )}
                  </span>
                </li>
              </ul>

              {/* Botón de inscripción */}
              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
                  isEnrolled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isAuthenticated
                  ? isEnrolled
                    ? 'Ya estás inscrito'
                    : 'Inscribirme en el curso'
                  : 'Regístrate para tomar el curso'}
              </button>

              {error && (
                <div className="mt-4 text-red-500 text-sm">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
