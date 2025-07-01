import {
  FaEye,
  FaUserGraduate,
  FaEnvelope,
  FaIdCard,
  FaBook,
  FaCalendarAlt,
} from 'react-icons/fa';

export const CourseStudents = ({ students }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Estudiantes del Curso</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {students?.length || 0} estudiantes
        </span>
      </div>

      {students?.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto w-24 h-24 text-gray-400 dark:text-gray-500">
            <FaUserGraduate className="w-full h-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No hay estudiantes inscritos
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Aún no hay estudiantes registrados en este curso.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {students?.map((student) => (
            <div
              key={student.id}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 flex items-start space-x-4">
                <img
                  src={student.photo || '/default-student-photo.jpg'}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-600"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {student.firstName} {student.lastName}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2 flex-shrink-0" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaIdCard className="mr-2 flex-shrink-0" />
                      <span>{student.enrollmentNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBook className="mr-2 flex-shrink-0" />
                      <span>{student.academicProgram}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 flex-shrink-0" />
                      <span>Semestre {student.semester}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-700 px-4 py-3 flex justify-end space-x-3">
                <button
                  onClick={() => handleViewGrades(student.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaEye className="mr-1" /> Ver Notas
                </button>
                {/* <button
                  onClick={() => handleRemoveStudent(student.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrashAlt className="mr-1" /> Eliminar
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
