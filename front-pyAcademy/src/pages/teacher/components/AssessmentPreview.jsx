import { useState } from 'react';

import PropTypes from 'prop-types';
import { Button } from '@/shared/ui/atoms/Button';

/**
     * Vista previa de evaluación en modo estudiante
     * @param {string} title - Título de la evaluación
     * @param {string} description - Descripción de la evaluación
     * @param {Array} questions - Arreglo de preguntas a mostrar
     * @param {function} onBack - Función para volver a modo edición
 */
export function AssessmentPreview({ 
    title, 
    description, 
    questions, 
    onBack,
    hideBackButton = false, 
}) {
    const [answers, setAnswers] = useState({});
    
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-6 text-gray-900 dark:text-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
        </h2>
        {description && (
            <p className="text-gray-700 dark:text-gray-200">
                {description}
            </p>
        )}

        <div className="space-y-6">
            {questions.map((q, index) => (
            <div key={q.id} className="border p-4 rounded-md bg-white shadow space-y-3">
                <h3 className="font-semibold">
                {index + 1}. {q.question}
                </h3>

                {q.type === 'short-answer' && (
                <input
                    type="text"
                    disabled
                    placeholder="Respuesta del estudiante"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                )}

                {q.type === 'multiple-choice' && (
                <div className="space-y-2">
                    {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                        <input
                            type={q.multiple ? 'checkbox' : 'radio'}
                            name={`question-${q.id}`}
                            checked={
                            q.multiple
                                ? (answers[q.id] || []).includes(i)
                                : answers[q.id] === i
                            }
                            onChange={e => {
                            if (q.multiple) {
                                const prev = answers[q.id] || [];
                                const next = e.target.checked
                                ? [...prev, i]
                                : prev.filter(idx => idx !== i);
                                setAnswers({ ...answers, [q.id]: next });
                            } else {
                                setAnswers({ ...answers, [q.id]: i });
                            }
                            }}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${
                            q.multiple ? 'rounded-none' : 'rounded-full'
                            }`}
                        />
                        <span>{opt}</span>
                    </label>
                    ))}
                </div>
                )}

                {q.type === 'code' && (
                <textarea
                    rows={6}
                    placeholder="Bloque de código"
                    disabled
                    className="w-full px-3 py-2 font-mono border bg-gray-100 rounded-md"
                />
                )}

                {q.type === 'image' && q.image && (
                <div>
                    <p className="text-sm text-gray-500">Imagen cargada:</p>
                    <img
                    src={URL.createObjectURL(q.image)}
                    alt="Pregunta"
                    className="max-w-full rounded border"
                    />
                </div>
                )}
            </div>
            ))}
        </div>

        {!hideBackButton && onBack && (
            <Button className="bg-green-700" onClick={onBack}>
            Volver a editar
            </Button>
        )}
        </div>
    );
}

AssessmentPreview.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        options: PropTypes.array,
        image: PropTypes.object,
        })
    ).isRequired,
    onBack: PropTypes.func.isRequired,
    hideBackButton: PropTypes.bool,
};
