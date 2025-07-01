
import { useMutation } from '@tanstack/react-query';
import { inscribirseCurso } from '../api/api';

export const useInscribirseCurso = () => {
  const mutation = useMutation({
    mutationFn: (data) => inscribirseCurso(data),
    onSuccess: (data) => {
      console.log('Inscripción exitosa', data);
    },
    onError: (error) => {
      console.error('❌ Error al inscribirse:', error.message);

      if (error.response) {
        console.error('🔴 Datos del error:', error.response.data);
        console.error('🔴 Código de estado HTTP:', error.response.status);
        console.error('🔴 Headers:', error.response.headers);
      } else if (error.request) {
        console.error('🟡 No hubo respuesta del servidor:', error.request);
      } else {
        console.error('⚠️ Error desconocido:', error.message);
      }
    },
  });

  return mutation;
};
