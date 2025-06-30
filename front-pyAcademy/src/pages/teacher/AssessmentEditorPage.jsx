import { useState } from "react";
import { AssessmentPreview } from "@/pages/teacher/components/AssessmentPreview";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/shared/ui/atoms/Textarea";
import Button from "@/shared/ui/atoms/Button";
import Input from "@/shared/ui/atoms/Input";
import Select from "@/shared/ui/atoms/Select";
import { Trash2, ImagePlus } from "lucide-react";
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import axios from "axios";
import { getUser } from "@/features/auth/utils/authCookies";


const user = getUser
const teacherId = user?.id;
console.log('ID del docente:', teacherId);

const QUESTION_TYPES = [
    { label: "Opción Múltiple", value: "multiple-choice" },
    { label: "Respuesta Corta", value: "short-answer" },
    { label: "Bloque de Código", value: "code" },
];

export default function AssessmentEditorPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [questions, setQuestions] = useState([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "success") => {
        const newNotification = { id: uuidv4(), message, type };
        setNotifications(prevNotifications => [...prevNotifications, newNotification]);

        // Eliminar la notificación después de 4 segundos
        setTimeout(() => {
            setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== newNotification.id));
        }, 4000)
    };

    const addQuestion = () => {
        setQuestions(prev => [
            ...prev,
            { id: uuidv4(), type: "short-answer", question: "", options: [], answer: "", image: null, imagePreview: null },
        ]);
    };

    const updateQuestion = (id, changes) => {
        setQuestions(prev =>
            prev.map(q => (q.id === id ? { ...q, ...changes } : q))
        );
    };

    const removeQuestion = id => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    // const handleSave = async () => {
    //     const formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     formData.append("dateTime", dateTime); // Añadir la fecha y hora

    //     questions.forEach((q, idx) => {
    //         formData.append(`questions[${idx}][id]`, q.id);
    //         formData.append(`questions[${idx}][type]`, q.type);
    //         formData.append(`questions[${idx}][question]`, q.question);
    //         formData.append(`questions[${idx}][answer]`, q.answer);

    //         if (q.type === "multiple-choice" && q.options) {
    //             q.options.forEach((opt, i) => {
    //                 formData.append(`questions[${idx}][options][${i}]`, opt);
    //             });
    //         }

    //         // Enviar una URL de imagen simulada (en vez de archivo o base64)
    //         if (q.image) {
    //             // Asegúrate de enviar una URL válida para la imagen
    //             formData.append(`questions[${idx}][image]`, "https://example.com/sample-image.jpg");
    //         } else {
    //             // Si no hay imagen, podemos enviar una cadena vacía o null si se requiere
    //             formData.append(`questions[${idx}][image]`, "");
    //         }
    //     });

    //     // Usando axios para realizar el POST
    //     try {
    //         const response = await axios.post('http://localhost:3000/evaluations', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data', // Esto es necesario para manejar archivos
    //             },
    //         });

    //         if (response.status === 201) {
    //             alert("Evaluación guardada correctamente");
    //         } else {
    //             alert("Error al guardar evaluación");
    //         }
    //     } catch (error) {
    //         console.error("Error al guardar evaluación:", error);
    //         alert("Error al guardar evaluación");
    //     }
    // };

    const handleSave = async () => {
    const evaluationData = {
        title,
        description,
        dateTime,
        questions: questions.map((q) => ({
            id: q.id,
            type: q.type,
            question: q.question,
            answer: q.answer,
            options: q.options,
            // Simulamos el envío de la imagen como URL de ejemplo
            image: q.image ? "https://example.com/sample-image.jpg" : "",
        })),
    };

    // Usando axios para realizar el POST como JSON
    try {
        const response = await axios.post('http://localhost:3000/evaluations', evaluationData, {
            headers: {
                'Content-Type': 'application/json', // Enviar como JSON
            },
        });

        if (response.status === 201) {
            addNotification("Evaluación guardada correctamente");
        } else {
            addNotification("Error al guardar evaluación");
        }
    } catch (error) {
        console.error("Error al guardar evaluación:", error);
        addNotification("Error al guardar evaluación");
    }
};


    if (previewMode) {
        return (
            <AssessmentPreview
                title={title}
                description={description}
                questions={questions}
                onBack={() => setPreviewMode(false)}
            />
        );
    }

    return (
        <>
            {/* Notificaciones flotantes */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-4 w-full max-w-sm">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`p-4 border rounded-md shadow-md text-white flex items-center gap-3 transition-all duration-300 ${
                            notif.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {/* Icono según el tipo de notificación */}
                        {notif.type === "success" ? (
                            <FaCheckCircle className="text-white text-xl" />
                        ) : (
                            <FaRegCircle className="text-white text-xl" />
                        )}

                        {/* Mensaje de la notificación */}
                        <span className="text-sm">{notif.message}</span>
                    </div>
                ))}
            </div>

            <div className="pt-4 pb-8">
                <div className="w-full md:max-w-3xl lg:max-w-4xl mx-auto bg-white dark:bg-primary-pri4 p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Crear Evaluación
                    </h1>

                    <div className="space-y-4 mb-8">
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Título de la evaluación"
                            className="bg-white text-black placeholder-gray-500 w-full"
                        />

                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descripción (opcional)"
                            rows={6}
                            className="w-full bg-white text-black placeholder-gray-500"
                        />

                        <Input
                            type="datetime-local"
                            value={dateTime}
                            onChange={e => setDateTime(e.target.value)}
                            className="bg-white text-black placeholder-gray-500 w-[30%]"
                        />
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, idx) => (
                            <div
                                key={q.id}
                                className="p-6 bg-white dark:bg-primary-pri4 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Pregunta {idx + 1}
                                    </h3>
                                    <div className="flex gap-2">
                                        {/* Botón de "Añadir Imagen" con icono */}
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                const fileInput = document.createElement("input");
                                                fileInput.type = "file";
                                                fileInput.onchange = (e) => {
                                                    const file = e.target.files[0];
                                                    updateQuestion(q.id, { image: file });

                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        updateQuestion(q.id, { imagePreview: reader.result });
                                                    };
                                                    if (file) reader.readAsDataURL(file);
                                                };
                                                fileInput.click();
                                            }}
                                        >
                                            <ImagePlus className="h-5 w-5 text-gray-900" />
                                        </Button>
                                        <Button variant="danger" onClick={() => removeQuestion(q.id)}>
                                            <Trash2 className="h-5 w-5 text-white" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Select
                                        options={QUESTION_TYPES}
                                        value={q.type}
                                        placeholder="Selecciona tipo de pregunta"
                                        onChange={e => {
                                            const newType = e.target.value;
                                            updateQuestion(q.id, {
                                                type: newType,
                                                options: newType === "multiple-choice" ? [""] : [],
                                            });
                                        }}
                                        className="w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-md px-3 py-2"
                                    />
                                    {/* Mostrar vista previa de la imagen */}
                                    {q.imagePreview && (
                                        <div className="mt-2">
                                            <img
                                                src={q.imagePreview}
                                                alt="Vista previa de la imagen"
                                                className="w-[50px] h-[50px] object-cover max-w-[100px] border rounded"
                                            />
                                        </div>
                                    )}
                                    <Textarea
                                        value={q.question}
                                        onChange={e => updateQuestion(q.id, { question: e.target.value })}
                                        placeholder="Escribe la pregunta"
                                        rows={4}
                                        className="w-full min-h-[4rem] border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400"
                                    />

                                    {q.type === "multiple-choice" && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-[1fr_auto_auto] items-center mb-2">
                                                <span />
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                                                    Respuesta/s
                                                </p>
                                                <span />
                                            </div>

                                            {q.options.map((opt, i) => (
                                                <div
                                                    key={i}
                                                    className="grid grid-cols-[1fr_auto_auto] items-center gap-2"
                                                >
                                                    <Input
                                                        value={opt}
                                                        onChange={e => {
                                                            const newOptions = [...q.options];
                                                            newOptions[i] = e.target.value;
                                                            updateQuestion(q.id, { options: newOptions });
                                                        }}
                                                        placeholder={`Opción ${i + 1}`}
                                                        className="flex-1"
                                                    />

                                                    <input
                                                        type={q.multiple ? "checkbox" : "radio"}
                                                        name={`correct-${q.id}`}
                                                        checked={q.multiple
                                                            ? Array.isArray(q.answer) && q.answer.includes(i)
                                                            : q.answer === i}
                                                        onChange={e => {
                                                            if (q.multiple) {
                                                                const prev = Array.isArray(q.answer) ? q.answer : [];
                                                                const next = e.target.checked
                                                                    ? [...prev, i]
                                                                    : prev.filter(idx => idx !== i);
                                                                updateQuestion(q.id, { answer: next });
                                                            } else {
                                                                updateQuestion(q.id, { answer: i });
                                                            }
                                                        }}
                                                        className={`h-5 w-5 text-green-600 focus:ring-green-500 ${q.multiple ? "rounded-none" : "rounded-full"}`}
                                                    />

                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            const newOptions = q.options.filter((_, idx) => idx !== i);
                                                            updateQuestion(q.id, { options: newOptions });
                                                        }}
                                                        className="p-2"
                                                    >
                                                        <Trash2 className="h-5 w-5 text-white" />
                                                    </Button>
                                                </div>
                                            ))}

                                            <label className="flex items-center gap-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    checked={q.multiple || false}
                                                    onChange={e =>
                                                        updateQuestion(q.id, {
                                                            multiple: e.target.checked,
                                                            answer: e.target.checked ? [] : ""
                                                        })
                                                    }
                                                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    Permitir múltiples respuestas
                                                </span>
                                            </label>

                                            <Button
                                                variant="secondary"
                                                className="mt-2"
                                                onClick={() => updateQuestion(q.id, { options: [...q.options, ""] })}
                                            >
                                                Añadir opción
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <Button variant="secondary" onClick={addQuestion}>
                            Agregar Pregunta
                        </Button>
                        <Button className="bg-green-700" onClick={() => setPreviewMode(true)}>
                            Vista previa
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Guardar evaluación
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
