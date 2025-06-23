import { useState } from "react";
import { AssessmentPreview } from "@/pages/teacher/components/AssessmentPreview";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/shared/ui/atoms/Textarea";
import Button from "@/shared/ui/atoms/Button";
import Input from "@/shared/ui/atoms/Input";
import Select from "@/shared/ui/atoms/Select";
import { Trash2 } from "lucide-react";

const QUESTION_TYPES = [
    { label: "Opción Múltiple", value: "multiple-choice" },
    { label: "Respuesta Corta", value: "short-answer" },
    { label: "Bloque de Código", value: "code" },
    { label: "Imagen", value: "image" },
];

export default function AssessmentEditorPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [previewMode, setPreviewMode] = useState(false);


    const addQuestion = () => {
        setQuestions(prev => [
        ...prev,
        { id: uuidv4(), type: "short-answer", question: "", options: [], answer: "" },
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

    const handleSave = async () => {
        const payload = { title, description, questions };
        try {
        console.log("Guardando evaluación:", payload);
        alert("Evaluación guardada correctamente");
        } catch (error) {
        console.error("Error al guardar evaluación:", error);
        alert("Error al guardar evaluación");
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
                    <Button variant="danger" onClick={() => removeQuestion(q.id)}>
                    Eliminar
                    </Button>
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
                            // Si es múltiple, inicializamos con una opción vacía
                            options: newType === "multiple-choice" ? [""] : [],
                        });
                    }}
                    className="w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-md px-3 py-2"
                    />

                    <Textarea
                    value={q.question}
                    onChange={e => updateQuestion(q.id, { question: e.target.value })}
                    placeholder="Escribe la pregunta"
                    rows={4}
                    className="w-full min-h-[4rem] border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400"
                    />

            {q.type === "multiple-choice" && (
                <div className="space-y-4">
                    {/* === HEADER DE COLUMNAS PARA “Respuesta/s” === */}
                    <div className="grid grid-cols-[1fr_auto_auto] items-center mb-2">
                    {/* Columna de inputs (vacía) */}
                    <span />
                    {/* Columna de controles */}
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        Respuesta/s
                    </p>
                    {/* Columna del botón (vacía) */}
                    <span />
                    </div>

                    {/* === CADA OPCIÓN SEA UN GRID: [INPUT][CHECK/RADIO][TRASH] === */}
                    {q.options.map((opt, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[1fr_auto_auto] items-center gap-2"
                    >
                        <Input
                        value={opt}
                        onChange={e => {
                            const newOptions = [...q.options]
                            newOptions[i] = e.target.value
                            updateQuestion(q.id, { options: newOptions })
                        }}
                        placeholder={`Opción ${i + 1}`}
                        className="flex-1"
                        />

                        <input
                        type={q.multiple ? "checkbox" : "radio"}
                        name={`correct-${q.id}`}
                        checked={
                            q.multiple
                            ? Array.isArray(q.answer) && q.answer.includes(i)
                            : q.answer === i
                        }
                        onChange={e => {
                            if (q.multiple) {
                            const prev = Array.isArray(q.answer) ? q.answer : []
                            const next = e.target.checked
                                ? [...prev, i]
                                : prev.filter(idx => idx !== i)
                            updateQuestion(q.id, { answer: next })
                            } else {
                            updateQuestion(q.id, { answer: i })
                            }
                        }}
                        className={`h-5 w-5 text-green-600 focus:ring-green-500 ${
                            q.multiple ? "rounded-none" : "rounded-full"
                        }`}
                        />

                        <Button
                        variant="danger"
                        onClick={() => {
                            const newOptions = q.options.filter((_, idx) => idx !== i)
                            updateQuestion(q.id, { options: newOptions })
                        }}
                        className="p-2"
                        >
                        <Trash2 className="h-5 w-5 text-white" />
                        </Button>
                    </div>
                    ))}

                    {/* toggle “Permitir múltiples respuestas” */}
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

                    {/* botón Añadir opción */}
                    <Button
                    variant="secondary"
                    className="mt-2"
                    onClick={() =>
                        updateQuestion(q.id, { options: [...q.options, ""] })
                    }
                    >
                    Añadir opción
                    </Button>
                </div>
            )}

                    {q.type === "image" && (
                    <Input
                        type="file"
                        onChange={e => updateQuestion(q.id, { image: e.target.files[0] })}
                        className="bg-white text-black w-full"
                    />
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
    );
}
