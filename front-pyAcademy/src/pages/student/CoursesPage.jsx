import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';
import { getCourseByStudent } from '@/shared/api/api';
import { getUser } from '@/features/auth/utils/authCookies';


function CoursesPage() {
  const navigate = useNavigate();
  const currentUser = getUser();
  const studentId = currentUser?.id;

  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['studentCourses', studentId],
    queryFn: () => getCourseByStudent(studentId),
  });

  const courses = response?.data || response || [];

  const handleCardClick = (id) => {
    navigate(`/student/curso/${id}`);
  };

  return (
    <section className="px-4 md:px-10 py-10 min-h-screen bg-gray-50 dark:bg-gradient-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mis Cursos</h2>
        {courses?.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {courses.length} cursos
          </span>
        )}
      </div>

      {courses?.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto w-24 h-24 text-gray-400 dark:text-gray-500">
            <FaUserGraduate className="w-full h-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No estás inscrito en ningún curso
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Explora nuestros cursos y comienza tu aprendizaje.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {courses?.map((course, index) => {
            const startDate = new Date(course.startDate).toLocaleDateString();
            const endDate = new Date(course.endDate).toLocaleDateString();

            const durationInWeeks = Math.ceil(course.durationInHours / 40);

            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course.id)}
                className="cursor-pointer bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={course.image || '/default-course-image.jpg'}
                  alt={course.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {course.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
                      <BsClockHistory />
                      <span>{durationInWeeks} semanas ({course.durationInHours} horas)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserGraduate />
                      <span>
                        Fechas: {startDate} - {endDate}
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
                        <span className="font-bold">${course.price.toFixed(2)}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CoursesPage;
