import { useMutation } from "@tanstack/react-query";
import { addUser, loginUser } from "@/shared/api/api";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      
      formData.append('username', data.username);
      formData.append('password', data.password);
      formData.append('email', data.email);
      formData.append('telefono', data.telefono);
      formData.append('nombre', data.nombre);
      formData.append('apellido', data.apellido);
      
      if (data.photo instanceof File) {  
        formData.append('photo', data.photo);
      }
      
      formData.append('roleRequest', JSON.stringify(data.roleRequest));
      
      return addUser(formData);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
