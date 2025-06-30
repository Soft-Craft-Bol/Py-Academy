import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '@/shared/api/api';

function UserProfilePage() {
  const { userId } = useParams();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => getUserDetails(userId),
  });


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-6">
          <img
            src={user.photo || '/default-avatar.png'}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 dark:border-zinc-600"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {user.userType === 'STUDENT' ? 'Estudiante' : 'Profesor'}
            </span>
          </div>
        </div>

        {user.userType === 'STUDENT' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Matrícula" value={user.enrollmentNumber} />
            <DetailItem label="Programa académico" value={user.academicProgram} />
            <DetailItem label="Semestre" value={user.semester} />
            <DetailItem label="Resumen de progreso" value={user.progressSummary} />
          </div>
        )}

        {user.userType === 'TEACHER' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Departamento" value={user.department} />
            <DetailItem label="Especialización" value={user.specialization} />
            <DetailItem label="Grado académico" value={user.academicDegree} />
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white">
        {value || 'No especificado'}
      </p>
    </div>
  );
}

export default UserProfilePage;
