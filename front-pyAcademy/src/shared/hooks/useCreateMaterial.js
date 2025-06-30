import { useMutation } from '@tanstack/react-query';
import { createLearningMaterial } from '@/shared/api/api';

/**
 * Hook para crear recursos educativos
 */
export function useCreateMaterial() {
    return useMutation({
        mutationFn: createLearningMaterial,
    });
}
