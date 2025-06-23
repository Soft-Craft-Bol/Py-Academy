import { useState } from "react";
import Button from "@/shared/ui/atoms/Button";
import { AssessmentPreview } from "@/pages/teacher/components/AssessmentPreview";

// Datos simulados
const dummyAssessments = [
    {
        id: "1",
        title: "Evaluación de Python Básico",
        description: "Pon a prueba tus conocimientos sobre variables, tipos y estructuras de control.",
        questions: [
        {
            id: "q1",
            type: "multiple-choice",
            question: "¿Cuál es el resultado de 2 + 2?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            multiple: false,
        },
        {
            id: "q2",
            type: "short-answer",
            question: "Escribe la palabra reservada para definir funciones en Python.",
            answer: "",
        },
        {
            id: "q3",
            type: "code",
            question: "¿Qué imprime este código?\n\n```python\nprint('Hola')\n```",
            answer: "",
        },
        ],
    },
    {
        id: "2",
        title: "Evaluación Avanzada de Python",
        description: "Temas de comprensión de listas, decoradores y manejo de excepciones.",
        questions: [
        {
            id: "q1",
            type: "multiple-choice",
            question: "¿Cómo creas una comprensión de lista?",
            options: ["[x for x in range(5)]", "list(range(5))", "{x:x for x in range(5)}"],
            answer: [0],
            multiple: true,
        },
        ],
    },
];

export default function AssessmentsListPage() {
    const [selected, setSelected] = useState(null);

    // Vista detallada
    if (selected) {
        return (
        <div className="max-w-4xl mx-auto py-8 space-y-6">
            {/* Header con botón Volver + acciones Editar/Eliminar */}
            <div className="flex justify-between items-center">
            <Button className="bg-sky-900" onClick={() => setSelected(null)}>
                Volver a lista
            </Button>
            <div className="space-x-2">
                <Button variant="primary">Editar</Button>
                <Button variant="danger">Eliminar</Button>
            </div>
            </div>

            {/* Reutilizamos tu Preview */}
            <AssessmentPreview
                title={selected.title}
                description={selected.description}
                questions={selected.questions}
                onBack={() => setSelected(null)}
                hideBackButton={true}
            />
        </div>
        );
    }

    return (
        <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Mis Evaluaciones
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dummyAssessments.map(a => (
            <div
                key={a.id}
                className="p-6 bg-white dark:bg-primary-pri4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelected(a)}
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {a.title}
                </h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                {a.description}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
}
