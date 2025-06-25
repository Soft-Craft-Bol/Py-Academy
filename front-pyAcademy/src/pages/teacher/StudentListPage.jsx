import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
// import api from '@/shared/api/axios.config'; // Descomenta cuando tengas axios configurado

/**
 * Simula una llamada al backend para obtener estudiantes por curso
 * @param {number} courseId - ID del curso
 * @returns {Promise<Array>} Lista de estudiantes
 */
const fetchStudentsByCourseId = async (courseId) => {
  // Ejemplo real (comenta el mock cuando lo uses)
  // const response = await api.get(`/cursos/${courseId}/estudiantes`);
  // return response.data;

  // Datos mock
    const mockData = {
        1: [
        { id: 1, name: 'Juan Pérez', email: 'juanperez@mail.com' },
        { id: 2, name: 'Lucía Gómez', email: 'luciagomez@mail.com' },
        ],
        2: [
        { id: 3, name: 'Carlos Díaz', email: 'carlosdiaz@mail.com' },
        { id: 4, name: 'Marta Ruiz', email: 'martaruiz@mail.com' },
        ],
        3: [],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(mockData[courseId] || []);
        }, 500);
    });
    };

    function StudentListPage() {
    const { id: courseId } = useParams();
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar estudiantes al montar
    useEffect(() => {
        const loadStudents = async () => {
        setIsLoading(true);
        const data = await fetchStudentsByCourseId(Number(courseId));
        setStudents(data);
        setIsLoading(false);
        };

        loadStudents();
    }, [courseId]);

    const handleViewGrades = (studentId) => {
        console.log(`Ver notas de estudiante ${studentId}`);
    };

    const handleRemoveStudent = (studentId) => {
        console.log(`Eliminar estudiante ${studentId} del curso`);
    };

    return (
        <section className="px-4 md:px-10 py-10 min-h-screen bg-gray-50 dark:bg-gradient-1">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Estudiantes del Curso #{courseId}
        </h2>

        {isLoading ? (
            <p className="text-gray-700 dark:text-white">Cargando estudiantes...</p>
        ) : students.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No hay estudiantes inscritos.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-md">
                <thead className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200">
                <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.id} className="border-t dark:border-zinc-700">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                        {student.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{student.email}</td>
                    <td className="px-4 py-2 space-x-3">
                        <button
                        onClick={() => handleViewGrades(student.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="Ver notas"
                        >
                        <FaEye />
                        </button>
                        <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title="Eliminar del curso"
                        >
                        <FaTrashAlt />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </section>
    );
}

export default StudentListPage;
