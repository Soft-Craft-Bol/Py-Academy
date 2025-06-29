import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../api/api';

export const useCreateCourse = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ courseData, teacherId, imageFile }) => {
      const formData = new FormData();

      formData.append('course', new Blob([JSON.stringify(courseData)], {
        type: 'application/json'
      }));

      formData.append('teacherId', teacherId);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      return createCourse(formData);
    },
    onSuccess: () => {
      toast.success('Curso creado exitosamente');
      navigate('/student/learning-units');
    },
    onError: (error) => {
      toast.error(`Error al crear curso: ${error.message}`);
    }
  });
};
