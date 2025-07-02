import { useMutation } from '@tanstack/react-query';
import { createCourse } from '../api/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useCreateCourse = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ courseData, teacherId, imageFile }) => {
      console.log('Enviando datos de curso:', { courseData, teacherId, imageFile });
      const formData = new FormData();

      // Agregar todos los campos del curso como JSON
      formData.append(
        'course',
        new Blob([JSON.stringify(courseData)], {
          type: 'application/json',
        })
      );

      // Agregar teacherId como parámetro
      formData.append('teacherId', teacherId);

      // Agregar archivo de imagen si existe
      if (imageFile) {
        formData.append('image', imageFile);
      }

      return createCourse(formData);
    },
    onSuccess: (response) => {
      console.log('Respuesta creación de curso:', response.data);
      toast.success('Curso creado exitosamente');
      const newCourseId = response.data.id; // Ajusta si tu API retorna otro campo
      navigate(`/teacher/course/${newCourseId}/add-units`);
    },
    onError: (error) => {
      console.error('Error al crear curso:', error);
      toast.error(`Error al crear curso: ${error.message}`);
    },
  });
};
