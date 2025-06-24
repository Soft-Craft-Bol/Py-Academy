import { useMutation } from '@tanstack/react-query';
import { createExercises } from '@/shared/api/api';

export function useCreateExercise() {
  return useMutation({
    mutationFn: (data) => createExercises(data),
  });
}
