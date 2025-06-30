import { useQuery } from '@tanstack/react-query';
import { BsClockHistory } from 'react-icons/bs';
import { FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getCoursesByTeacher } from '@/shared/api/api'; // Asegúrate de que la ruta sea correcta
import { getUser } from '@/features/auth/utils/authCookies';

function TeacherCoursesPage() {
    const navigate = useNavigate();
    const currentUser = getUser();
    const teacherId = currentUser?.id;

    // Usar TanStack Query para obtener los cursos del profesor
    const { data: response, isLoading, isError, error } = useQuery({
        queryKey: ['teacherCourses', teacherId],
        queryFn: () => getCoursesByTeacher(teacherId),
    });
  const courses = response?.data || response || [];
    const handleCardClick = (id) => {
        navigate(`/teacher/studentList/${id}/`);
    };

    return (
        <section className="px-4 md:px-10 py-10 min-h-screen bg-gray-50 dark:bg-gradient-1">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cursos Asignados</h2>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {courses?.map((course) => (
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

                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Descripción: <span className="font-medium">{course.description}</span>
                            </p>

                            <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-1 mt-2">
                                <div className="flex items-center gap-2">
                                    <BsClockHistory />
                                    <span>{course.durationInHours} horas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUserGraduate />
                                    <span>
                                        {/* {course.enrolled || 0} estudiantes */}
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
                                <span>
                                    Fechas: {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
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
