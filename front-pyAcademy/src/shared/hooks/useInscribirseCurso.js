
import { useMutation } from '@tanstack/react-query';
import { inscribirseCurso } from '../api/api';

export const useInscribirseCurso = () => {
  const mutation = useMutation({
    mutationFn: (data) => inscribirseCurso(data),
    onSuccess: (data) => {
      console.log('Inscripción exitosa', data);
    },
    onError: (error) => {
      console.error('Error al inscribirse', error);
    },
  });

  return mutation;
};
