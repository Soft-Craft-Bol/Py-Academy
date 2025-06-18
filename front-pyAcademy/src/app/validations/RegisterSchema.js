import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Requerido"),
  nombre: Yup.string().required("Requerido"),
  apellido: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().min(6).required("Requerido"),
  telefono: Yup.string().required("Requerido"),
});
