//React
import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

//Components
import Button from '../../shared/ui/atoms/Button';

//Hooks
import { usePyodide } from '@/features/code/hooks/usePyodide';
import { useExecuteCode } from '@/features/code/hooks/useExecuteCode';
import { useExecuteTestCases } from '@/features/code/hooks/useExecuteTestCases';

const PythonEditor = ({ title = true, testCases = [] }) => {
  const { pyodide, error, isLoading } = usePyodide();
  const { code, setCode, output, setOutput, input, setInput, handleExecuteCode, InfoOutput } =
    useExecuteCode();
  const { handleExecuteTestCases } = useExecuteTestCases(pyodide, setOutput, testCases, code);

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

        <h2 className="font-semibold my-4 text-label-md text-white">Entradas para `input()`:</h2>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Una línea por input()"
          className="w-full text-black border rounded p-2"
        />

        <br />
        <Button
          variant="primary"
          size="large"
          onClick={testCases.length == 0 ? handleExecuteCode : handleExecuteTestCases}
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
