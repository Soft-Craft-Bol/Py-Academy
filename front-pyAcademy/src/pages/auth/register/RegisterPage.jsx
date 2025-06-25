import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useRegister } from '@/shared/hooks/useAuth';
import Button from '@/shared/ui/atoms/Button';
import Input from '@/shared/ui/atoms/Input';
import ProfileImageUpload from '@/shared/ui/molecules/profile/ProfileImageUpload';

import { RegisterSchema } from '@/app/validations/RegisterSchema';

//import registerImage from "@/assets/img/registro.webp";

function RegisterPage() {
  const registerMutation = useRegister();
  const [preview, setPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [role, setRole] = useState('ESTUDIANTE');

  const isTeacher = role === 'MAESTRO';

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <main className="flex flex-1 w-full flex-col-reverse lg:flex-row items-center justify-center gap-8 px-4 sm:px-6 md:px-10 py-12">
        <section className="bg-white dark:bg-gradient-1 rounded-2xl p-8 sm:p-10 w-full max-w-lg shadow-xl">
          <h2 className="text-display-sm font-bold mb-8 text-center text-gray-900 dark:text-white">
            Crear cuenta
          </h2>

          <div className="relative mb-6 w-full max-w-sm mx-auto">
            <div className="relative flex items-center justify-between bg-neutral-800 border border-blue-500 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 bottom-0 left-0 w-1/2 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out ${role === 'MAESTRO' ? 'translate-x-full' : 'translate-x-0'
                  }`}
              ></div>

              <button
                type="button"
                onClick={() => setRole('ESTUDIANTE')}
                className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${role === 'ESTUDIANTE' ? 'text-white' : 'text-blue-400 hover:text-white'
                  }`}
              >
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => setRole('MAESTRO')}
                className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${role === 'MAESTRO' ? 'text-white' : 'text-blue-400 hover:text-white'
                  }`}
              >
                Maestro
              </button>
            </div>
          </div>

          <Formik
            initialValues={{
              username: '',
              nombre: '',
              apellido: '',
              email: '',
              password: '',
              telefono: '',
              department: '', // para MAESTRO
              specialization: '',
              academicDegree: '',
              enrollmentNumber: '', // para ESTUDIANTE
              academicProgram: '',
              semester: '',
              roleRequest: { roleListName: [role] },
            }}

            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              const commonData = {
                ...values,
                roleRequest: { roleListName: [role] },
                photo: photoFile,
              };

              if (role === 'MAESTRO') {
                commonData.teacherData = {
                  department: values.department,
                  specialization: values.specialization,
                  academicDegree: values.academicDegree,
                };
              }

              if (role === 'ESTUDIANTE') {
                commonData.studentData = {
                  enrollmentNumber: values.enrollmentNumber,
                  academicProgram: values.academicProgram,
                  semester: parseInt(values.semester, 10),
                };
              }

              registerMutation.mutate(commonData, {
                onSuccess: () => {
                  alert('Usuario registrado correctamente');
                  actions.resetForm();
                  setPreview(null);
                  setPhotoFile(null);
                },
                onError: (error) => {
                  console.error(error);
                  alert('Error al registrar usuario: ' + error.message);
                },
              });
            }}

          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <ProfileImageUpload
                  preview={preview}
                  setPreview={setPreview}
                  onChange={(file) => {
                    setPhotoFile(file);
                    setFieldValue('photo', file?.name || '');
                  }}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block mb-1 text-gray-900 dark:text-white">Nombre</label>
                    <Field name="nombre" as={Input} placeholder="Ingrese su nombre" />
                    <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block mb-1 text-gray-900 dark:text-white">Apellido</label>
                    <Field name="apellido" as={Input} placeholder="Ingrese su apellido" />
                    <ErrorMessage
                      name="apellido"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-gray-900 dark:text-white">
                    Nombre de usuario
                  </label>
                  <Field name="username" as={Input} placeholder="Ingrese su nombre de usuario" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-900 dark:text-white">
                    Correo electrónico
                  </label>
                  <Field name="email" as={Input} type="email" placeholder="Ingrese su correo" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-900 dark:text-white">Contraseña</label>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Ingrese su contraseña"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1 text-gray-900 dark:text-white">Teléfono</label>
                  <Field name="telefono" as={Input} placeholder="Ingrese su teléfono" />
                  <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Campo exclusivo de Docente */}
                {isTeacher && (
                  <>
                    <div>
                      <label>Departamento</label>
                      <Field name="department" as={Input} placeholder="Departamento" />
                      <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Especialización</label>
                      <Field name="specialization" as={Input} placeholder="Especialización" />
                      <ErrorMessage name="specialization" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Grado académico</label>
                      <Field name="academicDegree" as={Input} placeholder="Grado académico" />
                      <ErrorMessage name="academicDegree" component="div" className="text-red-500 text-sm" />
                    </div>
                  </>
                )}
                {!isTeacher && (
                  <>
                    <div>
                      <label>Número de matrícula</label>
                      <Field name="enrollmentNumber" as={Input} placeholder="Número de matrícula" />
                      <ErrorMessage name="enrollmentNumber" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Programa académico</label>
                      <Field name="academicProgram" as={Input} placeholder="Programa académico" />
                      <ErrorMessage name="academicProgram" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Semestre</label>
                      <Field name="semester" as={Input} placeholder="Semestre" type="number" />
                      <ErrorMessage name="semester" component="div" className="text-red-500 text-sm" />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full mt-4"
                >
                  {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </Button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </div>
  );
}

export default RegisterPage;
