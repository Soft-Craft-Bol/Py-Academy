import { useMutation } from '@tanstack/react-query';

import { registerUser } from '../services/registerService';

export const useRegister = () => {
  const mutation = useMutation(registerUser);

  const submit = (data) => {
    const payload = {
      ...data,
      roleRequest: { roleListName: [data.role] },
    };
    mutation.mutate(payload);
  };

  return { submit };
};
