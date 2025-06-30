import { useMutation } from '@tanstack/react-query';
import { createCourse } from '../api/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useCreateCourse = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ courseData, teacherId, imageFile }) => {
      const formData = new FormData();

      // Agregar todos los campos del curso como JSON
      formData.append('course', new Blob([JSON.stringify(courseData)], {
        type: 'application/json'
      }));

      // Agregar teacherId como parámetro
      formData.append('teacherId', teacherId);

      // Agregar archivo de imagen si existe
      if (imageFile) {
        formData.append('image', imageFile);
      }

      return createCourse(formData);
    },
    onSuccess: () => {
      toast.success('Curso creado exitosamente');
      navigate('/teacher/learning-units');
    },
    onError: (error) => {
      toast.error(`Error al crear curso: ${error.message}`);
    }
  });
};
