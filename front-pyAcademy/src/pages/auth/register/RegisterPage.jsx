import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "@/shared/ui/atoms/Input";
import Button from "@/shared/ui/atoms/Button";
import { useRegister } from "@/shared/hooks/useAuth";
import { RegisterSchema } from "@/app/validations/RegisterSchema";
import { useState } from "react";
import ProfileImageUpload from "@/shared/ui/molecules/profile/ProfileImageUpload";
//import registerImage from "@/assets/img/registro.webp";

const RegisterPage = () => {
const registerMutation = useRegister();
const [preview, setPreview] = useState(null);
const [photoFile, setPhotoFile] = useState(null);
const [role, setRole] = useState("ESTUDIANTE");

const isTeacher = role === "DOCENTE";

return (
        <div className="min-h-screen flex flex-col text-gray-800">
        <main className="flex flex-1 max-w-10xl mx-auto px-6 sm:px-8 items-center justify-center gap-12 flex-col lg:flex-row py-16">
            {/* Imagen ilustrativa
            <div className="w-full max-w-md rounded-lg overflow-hidden lg:max-w-lg dark:shadow-yellow-500/50 shadow-xl transition-transform duration-300 ease-in-out">
            <img
                src={registerImage}
                alt="Imagen de registro"
                className="w-full h-auto object-cover"
            />
            </div> */}

            <section className="bg-white dark:bg-gradient-1 rounded-2xl p-8 sm:p-10 w-full max-w-lg shadow-xl">
            <h2 className="text-display-sm font-bold mb-8 text-center text-white">
                Crear cuenta
            </h2>

            {/* Segment Switch con animación */}
            <div className="relative mb-6 w-full max-w-sm mx-auto">
                <div className="flex bg-neutral-800 border border-blue-500 rounded-full overflow-hidden relative">
                    <div
                    className={`absolute top-0 left-0 w-1/2 h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out transform ${
                        role === "DOCENTE" ? "translate-x-full" : "translate-x-0"
                    }`}
                    />
                    <button
                    type="button"
                    onClick={() => setRole("ESTUDIANTE")}
                    className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${
                        role === "ESTUDIANTE" ? "text-white" : "text-blue-400 hover:text-white"
                    }`}
                    >
                    Estudiante
                    </button>
                    <button
                    type="button"
                    onClick={() => setRole("DOCENTE")}
                    className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-200 ${
                        role === "DOCENTE" ? "text-white" : "text-blue-400 hover:text-white"
                    }`}
                    >
                    Docente
                    </button>
                </div>
            </div>


            <Formik
                initialValues={{
                username: "",
                nombre: "",
                apellido: "",
                email: "",
                password: "",
                telefono: "",
                materia: "",
                roleRequest: { roleListName: [role] },
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values, actions) => {
                registerMutation.mutate(
                    {
                    ...values,
                    roleRequest: { roleListName: [role] },
                    photo: photoFile,
                    },
                    {
                    onSuccess: () => {
                        alert("Usuario registrado correctamente");
                        actions.resetForm();
                        setPreview(null);
                        setPhotoFile(null);
                    },
                    onError: (error) => {
                        console.error(error);
                        alert("Error al registrar usuario: " + error.message);
                    },
                    }
                );
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                <Form className="space-y-4">
                    <ProfileImageUpload
                    preview={preview}
                    setPreview={setPreview}
                    onChange={(file) => {
                        setPhotoFile(file);
                        setFieldValue("photo", file?.name || "");
                    }}
                    />

                    <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-white">Nombre</label>
                        <Field name="nombre" as={Input} placeholder="Ingrese su nombre" />
                        <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-white">Apellido</label>
                        <Field name="apellido" as={Input} placeholder="Ingrese su apellido" />
                        <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />
                    </div>
                    </div>

                    <div>
                    <label className="block mb-1 text-white">Nombre de usuario</label>
                    <Field name="username" as={Input} placeholder="Ingrese su nombre de usuario" />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label className="block mb-1 text-white">Correo electrónico</label>
                    <Field name="email" as={Input} type="email" placeholder="Ingrese su correo" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label className="block mb-1 text-white">Contraseña</label>
                    <Field name="password" as={Input} type="password" placeholder="Ingrese su contraseña" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label className="block mb-1 text-white">Teléfono</label>
                    <Field name="telefono" as={Input} placeholder="Ingrese su teléfono" />
                    <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Campo exclusivo de Docente */}
                    {isTeacher && (
                    <div>
                        <label className="block mb-1 text-white">Materia</label>
                        <Field name="materia" as={Input} placeholder="Materia que impartirá" />
                        <ErrorMessage name="materia" component="div" className="text-red-500 text-sm" />
                    </div>
                    )}

                    <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full mt-4">
                    {isSubmitting ? "Registrando..." : "Registrarse"}
                    </Button>
                </Form>
                )}
            </Formik>
            </section>
        </main>
        </div>
    );
};

export default RegisterPage;
