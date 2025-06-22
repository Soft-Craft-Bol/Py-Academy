import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Campo requerido'),
  nombre: Yup.string().required('Campo requerido'),
  apellido: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Email inválido').required('Campo requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  telefono: Yup.string().required('Campo requerido'),
  materia: Yup.string().when('roleRequest', {
    is: (val) => val?.roleListName?.includes('DOCENTE'),
    then: (schema) => schema.required('Campo requerido para docentes'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
