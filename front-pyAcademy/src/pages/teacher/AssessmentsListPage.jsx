import { useState, useEffect } from "react";
import Button from "@/shared/ui/atoms/Button";
import { AssessmentPreview } from "@/pages/teacher/components/AssessmentPreview";
import axios from "axios";

export default function AssessmentsListPage() {
    const [selected, setSelected] = useState(null);
    const [assessments, setAssessments] = useState([]); // Estado para almacenar las evaluaciones
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Cargar evaluaciones desde la API
    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/evaluations');
                setAssessments(response.data); // Almacenamos las evaluaciones en el estado
            } catch (err) {
                setError('Error al cargar las evaluaciones');
                console.error('Error al cargar las evaluaciones:', err);
            } finally {
                setLoading(false); // Cambiamos el estado de carga cuando termina
            }
        };

        fetchAssessments(); // Llamamos la función al montar el componente
    }, []);

    // Vista detallada de la evaluación seleccionada
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

                {/* Vista previa de la evaluación */}
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

    // Si aún estamos cargando, mostramos un mensaje de carga
    if (loading) {
        return <div>Cargando evaluaciones...</div>;
    }

    // Si ocurre un error, mostramos un mensaje de error
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Mis Evaluaciones
            </h1>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {assessments.map((a) => (
                    <div
                        key={a.id}
                        className="p-6 bg-white dark:bg-primary-pri4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                        onClick={() => setSelected(a)} // Al seleccionar una evaluación
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
