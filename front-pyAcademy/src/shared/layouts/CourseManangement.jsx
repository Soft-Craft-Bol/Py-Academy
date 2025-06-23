import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  durationInHours: "",
  level: "",
  price: "",
  startDate: "",
  endDate: "",
  maxStudents: "",
  isActive: true,
  image: null,
};

const levels = ["Básico", "Intermedio", "Avanzado"];

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  durationInHours: Yup.number().min(1, "Mínimo 1 hora").required("La duración es obligatoria"),
  level: Yup.string().required("El nivel es obligatorio"),
  price: Yup.number().min(0.01, "El precio debe ser mayor a 0").required("El precio es obligatorio"),
  startDate: Yup.date().required("La fecha de inicio es obligatoria"),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "La fecha de fin debe ser posterior a la de inicio"
  ).required("La fecha de fin es obligatoria"),
  maxStudents: Yup.number().min(1, "Debe haber al menos 1 estudiante").required("El número máximo de estudiantes es obligatorio"),
  isActive: Yup.boolean(),
  image: Yup.mixed().nullable(),
});

const CourseManangement = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[var(--color-background)] dark:bg-primary-pri4 rounded-2xl shadow-lg border border-[var(--color-border)] dark:border-primary-pri3 p-0 md:p-0 overflow-hidden transition-colors duration-300">
      <div className="bg-[var(--color-primary)] dark:bg-primary-pri3 py-6 px-8 flex items-center gap-4">
        <img src="/public/python.svg" alt="Logo" className="h-12 w-12 rounded-full bg-white p-2 shadow" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Nuevo Curso</h2>
          <p className="text-[var(--color-secondary)] dark:text-primary-pri1 text-sm">Completa la información para crear un curso atractivo y profesional.</p>
        </div>
      </div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          toast.success("Curso creado correctamente");
          resetForm();
          setImagePreview(null);
          setTimeout(() => {
            navigate("/student/learning-units");
          }, 800);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white dark:bg-primary-pri4 transition-colors duration-300">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Nombre del Curso</label>
              <Field
                name="name"
                type="text"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
                placeholder="Ej: Python desde cero"
              />
              <ErrorMessage name="name" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Nivel</label>
              <Field
                as="select"
                name="level"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
              >
                <option value="">Selecciona un nivel</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </Field>
              <ErrorMessage name="level" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Descripción</label>
              <Field
                as="textarea"
                name="description"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white min-h-[80px]"
                placeholder="Describe brevemente el contenido y objetivos del curso"
              />
              <ErrorMessage name="description" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Duración (horas)</label>
              <Field
                name="durationInHours"
                type="number"
                min="1"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
                placeholder="Ej: 20"
              />
              <ErrorMessage name="durationInHours" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Precio (USD)</label>
              <Field
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
                placeholder="Ej: 49.99"
              />
              <ErrorMessage name="price" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Fecha de Inicio</label>
              <Field
                name="startDate"
                type="date"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
              />
              <ErrorMessage name="startDate" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Fecha de Fin</label>
              <Field
                name="endDate"
                type="date"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
              />
              <ErrorMessage name="endDate" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Máximo de Estudiantes</label>
              <Field
                name="maxStudents"
                type="number"
                min="1"
                className="border border-[var(--color-border)] dark:border-primary-pri3 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-primary-pri2 bg-[var(--color-background)] dark:bg-primary-pri4 text-[var(--color-text)] dark:text-white"
                placeholder="Ej: 100"
              />
              <ErrorMessage name="maxStudents" component="div" className="text-[var(--color-danger)] text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Estado</label>
              <div className="flex items-center gap-3">
                <Field
                  name="isActive"
                  type="checkbox"
                  className="h-5 w-5 text-[var(--color-primary)] dark:text-primary-pri2 focus:ring-[var(--color-primary-dark)] dark:focus:ring-primary-pri1 border-[var(--color-border)] dark:border-primary-pri3 rounded"
                />
                <span className="text-[var(--color-text-light)] dark:text-primary-pri1">Curso Activo</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold text-[var(--color-text)] dark:text-white">Imagen del Curso</label>
              <div className="flex items-center gap-6">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={e => {
                    setFieldValue("image", e.target.files[0]);
                    if (e.target.files[0]) {
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="w-full"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-[var(--color-border)] dark:border-primary-pri3 shadow" />
                )}
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[var(--color-primary)] dark:bg-primary-pri2 hover:bg-[var(--color-primary-dark)] dark:hover:bg-primary-pri1 text-white px-10 py-3 rounded-lg font-bold shadow transition-all duration-200 text-lg"
              >
                Crear Curso
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseManangement;
