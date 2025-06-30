import * as Yup from "yup";


export const ValidatioCourse = Yup.object({
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
   image: Yup.mixed()
      .required("La imagen del curso es obligatoria")
      .test(
        "fileType",
        "Solo se permiten imágenes (JPEG, PNG, JPG)",
        (value) => value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      )
      .test(
        "fileSize",
        "La imagen es demasiado grande (máx. 5MB)",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
});
