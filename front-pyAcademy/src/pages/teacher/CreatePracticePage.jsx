import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '@/shared/ui/atoms/Input';
import { Textarea } from '@/shared/ui/atoms/Textarea';
import Select from '@/shared/ui/atoms/Select';
import Button from '@/shared/ui/atoms/Button';
import { Trash2 } from 'lucide-react';
import { useCreateExercise } from '@/shared/hooks/useCreateExercise';

const DIFFICULTIES = [
  { label: 'Principiante', value: 'Principiante' },
  { label: 'Intermedio', value: 'Intermedio' },
  { label: 'Avanzado', value: 'Avanzado' },
];

const LANGUAGES = [{ label: 'Python', value: 'python' }];

export default function CreatePracticePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');
  const [difficulty, setDifficulty] = useState('Principiante');
  const [language, setLanguage] = useState('python');
  const [testCases, setTestCases] = useState([]);

  const { mutate: createExercise, isPending, isSuccess, isError } = useCreateExercise();

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: uuidv4(),
        inputData: '',
        expectedOutput: '',
      },
    ]);
  };

  const updateTestCase = (id, changes) => {
    setTestCases(testCases.map((tc) => (tc.id === id ? { ...tc, ...changes } : tc)));
  };

  const removeTestCase = (id) => {
    setTestCases(testCases.filter((tc) => tc.id !== id));
  };

  const handleSave = () => {
    const newPractice = {
      title,
      description,
      starterCode,
      solutionCode,
      difficultyLevel: difficulty,
      language,
      sequenceNumber: 1,
      testCases: testCases.map((tc) => ({
        inputData: tc.inputData,
        expectedOutput: tc.expectedOutput,
      })),
    };

    console.log('La new practice es', newPractice);

    createExercise(newPractice, {
      onSuccess: () => {
        alert('Ejercicio creado correctamente');
        setTitle('');
        setDescription('');
        setStarterCode('');
        solutionCode('');
        setTestCases([]);
      },
      onError: (err) => {
        console.error('Error creando el ejercicio:', err);
        alert('Error al crear el ejercicio');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Crear Práctica de Programación
      </h1>

      <div className="space-y-6 bg-white dark:bg-primary-pri4 p-6 rounded-lg shadow-md">
        {/* Título */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Título del ejercicio
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del ejercicio"
            className="text-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Descripción
          </label>
          <Textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el problema que debe resolverse"
            className="placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Código inicial */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Código inicial
          </label>
          <Textarea
            rows={6}
            value={starterCode}
            onChange={(e) => setStarterCode(e.target.value)}
            placeholder="Código base que el estudiante verá"
            className="placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
            Solución esperada (solución del ejercicio)
          </label>
          <Textarea
            rows={6}
            value={solutionCode}
            onChange={(e) => setSolutionCode(e.target.value)}
            placeholder="Código de solución que se usará para validar"
            className="placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Dificultad y Lenguaje */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Dificultad
            </label>
            <Select
              options={DIFFICULTIES}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Lenguaje
            </label>
            <Select
              options={LANGUAGES}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Casos de prueba */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Casos de prueba
        </h2>

        <div className="space-y-4">
          {testCases.map((tc, i) => (
            <div
              key={tc.id}
              className="p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800 dark:text-white">Caso #{i + 1}</h3>
                <Button variant="danger" onClick={() => removeTestCase(tc.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Entrada */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Entrada (input)
                </label>
                <Input
                  value={tc.inputData}
                  onChange={(e) => updateTestCase(tc.id, { inputData: e.target.value })}
                  placeholder="Ej: 2 3"
                  className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Salida */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Salida esperada (output)
                </label>
                <Input
                  value={tc.expectedOutput}
                  onChange={(e) => updateTestCase(tc.id, { expectedOutput: e.target.value })}
                  placeholder="Ej: 5"
                  className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-4" onClick={addTestCase}>
          + Agregar caso de prueba
        </Button>
      </div>

      {/* Guardar */}
      <div className="mt-8">
        <Button variant="primary" onClick={handleSave} disabled={isPending}>
          {isPending ? 'Guardando...' : 'Guardar práctica'}
        </Button>
      </div>
    </div>
  );
}
