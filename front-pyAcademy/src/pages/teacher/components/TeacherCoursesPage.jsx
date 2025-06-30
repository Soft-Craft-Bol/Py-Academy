import { BsClockHistory } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Api
import { getTeacherCourses } from '@/shared/api/api';

//Context
import { getUser } from '@/features/auth/utils/authCookies';

function TeacherCoursesPage() {
  const [courses, setCourses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      const res = await getTeacherCourses(getUser().id);
      setCourses(res.data);
    }
    fetchCourses();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/teacher/course/${id}`);
  };

  return (
    <section className="px-4 md:px-10 py-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cursos Asignados</h2>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {courses &&
          courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCardClick(course.id)}
              className="cursor-pointer bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={course.imageUrl}
                alt={course.description}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {course.description}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Profesor: <span className="font-medium">{getUser().username}</span>
                </p>

                <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <BsClockHistory />
                    <span>{course.durationInHours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserGraduate />
                    <span>
                      {0}/{course.maxStudents} estudiantes
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

export default TeacherCoursesPage;
