//React
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

//Components
import Button from "../../shared/ui/atoms/Button";

const PythonEditor = ({ title = true, onEvaluation, testCases = [] }) => {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!window.loadPyodide) {
        setOutput("No se pudo cargar Pyodide. Verifica que esté en index.html");
        return;
      }
      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);
      console.log("Pyodide cargado");
    };
    load();
  }, []);

  const handleExecuteCode = async () => {
    if (!pyodide) {
      setOutput("Pyodide aún no está listo");
      return;
    }
    try {
      const inputLines = input.split("\n");
      let index = 0;

      pyodide.globals.set("input", () => {
        if (index >= inputLines.length) {
          throw new Error("No hay más entradas disponibles para input()");
        }
        return inputLines[index++];
      });

      let salida = "";
      pyodide.setStdout({ batched: (text) => (salida += text) });

      await pyodide.runPythonAsync(code);
      setOutput(salida);
      if (onEvaluation) onEvaluation(salida);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleExecuteTestCases = async () => {
    if (!pyodide) {
      setOutput("Pyodide aún no está listo");
      return;
    }

    let allTestsPassed = true;
    let results = "";

    for (let testCase of testCases) {
      try {
        // Dividir por espacios Y por saltos de línea para manejar ambos casos
        const inputLines = testCase.inputData
          .split(/[\s\n]+/) // ✅ Divide por espacios y saltos de línea
          .filter((line) => line.trim() !== ""); // Filtra líneas vacías

        let index = 0;
        console.log("Los inputs lines son", inputLines);

        pyodide.globals.set("input", () => {
          if (index >= inputLines.length) {
            throw new Error("No hay más entradas disponibles para input()");
          }
          return inputLines[index++];
        });

        let salida = "";
        pyodide.setStdout({ batched: (text) => (salida += text) });

        await pyodide.runPythonAsync(code);

        if (salida.trim() !== testCase.expectedOutput.trim()) {
          allTestsPassed = false;
          results += `Test ${testCase.id}: FALLÓ\nEsperado: ${
            testCase.expectedOutput
          }\nObtenido: ${salida.trim()}\n\n`;
        } else {
          results += `Test ${testCase.id}: PASÓ\n\n`;
        }
      } catch (error) {
        allTestsPassed = false;
        results += `Test ${testCase.id}: ERROR - ${error.message}\n\n`;
      }
    }

    setOutput(results);
    if (allTestsPassed) {
      window.alert("Todos los tests pasaron correctamente");
    } else {
      window.alert("Algunos tests fallaron");
    }
  };

  return (
    <div className="mt-6 mx-auto px-4 w-full max-w-7xl">
      {title && (
        <h1 className="p-1 rounded-lg text-center font-bold text-title-lg dark:text-white mb-5">
          Editor de codigo Python
        </h1>
      )}

      <div className="bg-primary-pri2 dark:bg-primary-pri4 p-4 sm:p-6 md:p-7 rounded-lg shadow-blue-500/50 shadow-lg">
        <h2 className="font-semibold my-4 text-label-md text-white">Entrada</h2>
        <CodeMirror
          value={code}
          height="200px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          className="text-blue-700 border rounded"
        />

        <h2 className="font-semibold my-4 text-label-md text-white">
          Entradas para `input()`:
        </h2>
        <textarea
          rows={3}
          //cols={60}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Una línea por input()"
          className="w-full text-black border rounded p-2"
        />

        <br />
        <Button
          variant="primary"
          size="large"
          onClick={
            testCases.length == 0 ? handleExecuteCode : handleExecuteTestCases
          }
          className="bg-primary-pri1 px-4 py-2 mt-3"
        >
          Ejecutar
        </Button>
      </div>

      <div className="bg-primary-pri2 dark:bg-primary-pri4 p-7 rounded-lg shadow-blue-500/50 shadow-lg mt-10 mb-10">
        <h2 className="font-semibold my-4 text-label-md text-white">Salida</h2>
        <pre className="p-3 rounded-md overflow-auto bg-white text-black text-sm sm:text-base w-full break-words">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default PythonEditor;
