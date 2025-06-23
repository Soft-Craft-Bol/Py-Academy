import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "@/shared/ui/atoms/Input";
import { Textarea } from "@/shared/ui/atoms/Textarea";
import Select from "@/shared/ui/atoms/Select";
import Button from "@/shared/ui/atoms/Button";
import { Trash2 } from "lucide-react";

const DIFFICULTIES = [
  { label: "Principiante", value: "Principiante" },
  { label: "Intermedio", value: "Intermedio" },
  { label: "Avanzado", value: "Avanzado" }
];

const LANGUAGES = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
];

export default function CreatePracticePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [difficulty, setDifficulty] = useState("Principiante");
  const [language, setLanguage] = useState("python");
  const [testCases, setTestCases] = useState([]);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: uuidv4(),
        inputData: "",
        expectedOutput: "",
        isHidden: false,
        weight: 10
      }
    ]);
  };

  const updateTestCase = (id, changes) => {
    setTestCases(testCases.map(tc => (tc.id === id ? { ...tc, ...changes } : tc)));
  };

  const removeTestCase = (id) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const handleSave = () => {
    const newPractice = {
      title,
      description,
      starterCode,
      difficultyLevel: difficulty,
      language,
      testCases
    };

    console.log("Ejercicio guardado (simulado):", newPractice);
    alert("Ejercicio guardado (simulado)");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Crear Práctica de Programación</h1>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <Input
          placeholder="Título del ejercicio"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Descripción del ejercicio"
          rows={5}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Textarea
          placeholder="Código inicial (starter code)"
          rows={6}
          value={starterCode}
          onChange={e => setStarterCode(e.target.value)}
        />

        <div className="flex gap-4">
          <Select
            options={DIFFICULTIES}
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="flex-1"
          />
          <Select
            options={LANGUAGES}
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Casos de prueba</h2>
        <div className="space-y-4">
          {testCases.map((tc, i) => (
            <div
              key={tc.id}
              className="p-4 bg-gray-50 border rounded-md shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Caso #{i + 1}</h3>
                <Button variant="danger" onClick={() => removeTestCase(tc.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <Input
                placeholder="Entrada (input)"
                value={tc.inputData}
                onChange={e => updateTestCase(tc.id, { inputData: e.target.value })}
              />

              <Input
                placeholder="Salida esperada (output)"
                value={tc.expectedOutput}
                onChange={e => updateTestCase(tc.id, { expectedOutput: e.target.value })}
              />

              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Peso (%)"
                  value={tc.weight}
                  onChange={e => updateTestCase(tc.id, { weight: Number(e.target.value) })}
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tc.isHidden}
                    onChange={e => updateTestCase(tc.id, { isHidden: e.target.checked })}
                  />
                  Oculto
                </label>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-4" onClick={addTestCase}>
          + Agregar caso de prueba
        </Button>
      </div>

      <div className="mt-8">
        <Button variant="primary" onClick={handleSave}>
          Guardar práctica (simulado)
        </Button>
      </div>
    </div>
  );
}
