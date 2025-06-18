import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "@/shared/ui/atoms/Input";
import Button from "@/shared/ui/atoms/Button";
import { useRegister } from "@/shared/hooks/useAuth";
import { RegisterSchema } from "@/app/validations/RegisterSchema";
import { useState } from "react";
import ProfileImageUpload from "@/shared/ui/molecules/profile/ProfileImageUpload";
import registerImage from "@/assets/img/registro.webp";

const RegisterPage = () => {
    const registerMutation = useRegister();
    const [preview, setPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    return (
        <div className="min-h-screen flex flex-col text-gray-800">
            <main className="flex flex-1 max-w-10xl mx-auto px-6 sm:px-8 items-center justify-center gap-12 flex-col lg:flex-row py-16">
                {/* Imagen ilustrativa */}
                <div className="w-full max-w-md rounded-lg overflow-hidden lg:max-w-lg dark:shadow-yellow-500/50 shadow-xl transition-transform duration-300 ease-in-out">
                    <img
                        src={registerImage}
                        alt="Imagen de registro"
                        className="w-full h-auto object-cover"
                    />
                </div>

                <section className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-lg shadow-xl dark:bg-gradient-1">
                    <h2 className="text-display-sm font-bold mb-8 text-center">
                        Crear cuenta
                    </h2>

                    <Formik
                        initialValues={{
                            username: "",
                            nombre: "",
                            apellido: "",
                            email: "",
                            password: "",
                            telefono: "",
                            roleRequest: { roleListName: ["ADMIN"] },
                        }}
                        validationSchema={RegisterSchema}
                        // Cambia el onSubmit del Formik a:
                        onSubmit={(values, actions) => {
                            registerMutation.mutate({ ...values, photo: photoFile }, {
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
                            });
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="space-y-4">
                                <ProfileImageUpload
                                    preview={preview}
                                    setPreview={setPreview}
                                    onChange={(file) => {
                                        setPhotoFile(file); // Guardamos el archivo real
                                        setFieldValue("photo", file?.name || ""); // Opcional: para validación
                                    }}
                                />

                                <Field name="username">
                                    {({ field }) => <Input {...field} placeholder="Usuario" />}
                                </Field>
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-0" />

                                <Field name="nombre">
                                    {({ field }) => <Input {...field} placeholder="Nombre" />}
                                </Field>
                                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />

                                <Field name="apellido">
                                    {({ field }) => <Input {...field} placeholder="Apellido" />}
                                </Field>
                                <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />

                                <Field name="email">
                                    {({ field }) => <Input {...field} type="email" placeholder="Email" />}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                                <Field name="password">
                                    {({ field }) => <Input {...field} type="password" placeholder="Contraseña" />}
                                </Field>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                                <Field name="telefono">
                                    {({ field }) => <Input {...field} placeholder="Teléfono" />}
                                </Field>
                                <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />

                                <Button type="submit" variant="primary" disabled={isSubmitting}>
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
