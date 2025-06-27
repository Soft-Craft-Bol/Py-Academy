import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from 'react';

// Components
import Button from '../../shared/ui/atoms/Button';
import {
  LoaderCircle,
  TimerReset,
  TerminalSquare,
  AlignLeft,
  Code2,
} from 'lucide-react'; // ✅ Todos existen

// Hooks
import { usePyodide } from '@/features/code/hooks/usePyodide';
import { useExecuteCode } from '@/features/code/hooks/useExecuteCode';
import { useExecuteTestCases } from '@/features/code/hooks/useExecuteTestCases';

const PythonEditor = ({ title = true, testCases = [], timeLimit = 120 }) => {
  const { pyodide, isLoading } = usePyodide();
  const {
    code,
    setCode,
    output,
    setOutput,
    input,
    setInput,
    handleExecuteCode,
  } = useExecuteCode(pyodide);
  const { handleExecuteTestCases } = useExecuteTestCases(pyodide, setOutput, testCases, code);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Temporizador: cuenta regresiva cuando comienza
  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  // Ejecutar código con feedback de carga
  const onExecute = async () => {
    setIsExecuting(true);
    try {
      if (testCases.length === 0) {
        await handleExecuteCode();
      } else {
        await handleExecuteTestCases();
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Feedback visual (carga, éxito, error)
  const renderFeedback = () => {
    if (isExecuting) {
      return (
        <div className="flex items-center gap-2 text-blue-200 bg-blue-800/30 px-3 py-2 rounded-lg my-4">
          <LoaderCircle className="animate-spin" size={20} />
          Ejecutando código...
        </div>
      );
    }
    if (output) {
      const isError = output.toLowerCase().includes('error');
      return (
        <div
          className={`my-4 font-semibold px-4 py-2 rounded-lg border-l-4 ${
            isError
              ? 'text-red-300 bg-red-800/30 border-red-500'
              : 'text-green-300 bg-green-800/30 border-green-500'
          }`}
        >
          {isError ? '❌ Error detectado' : '✔️ Ejecución exitosa'}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 mx-auto px-4 w-full max-w-7xl space-y-10">
      {title && (
        <h1 className="p-2 text-center font-bold text-3xl text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text">
          Editor de código Python
        </h1>
      )}

      {/* Temporizador */}
      <div className="flex items-center gap-2 text-white text-lg font-medium">
        <TimerReset className="text-yellow-400" size={20} />
        Tiempo restante:{' '}
        <span className="text-yellow-300">{timeLeft}s</span>
      </div>

      {/* Editor */}
      <div className="bg-gradient-to-tr from-primary-pri2 to-primary-pri4 p-6 rounded-2xl shadow-lg shadow-blue-800/30">
        <h2 className="flex items-center gap-2 text-label-lg text-white mb-3">
          <Code2 size={20} /> Código Python
        </h2>
        <div className="overflow-hidden rounded-xl shadow-inner border border-white/10 bg-[#1e1e1e]">
          <CodeMirror
            value={code}
            height="320px"
            extensions={[python()]}
            onChange={(value) => {
              setCode(value);
              if (!timerStarted && value.trim() !== '') {
                setTimerStarted(true);
              }
            }}
            theme="dark"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              foldGutter: false,
              indentOnInput: true,
            }}
            style={{
              fontSize: '20px',
              fontFamily: "'Fira Code', monospace",
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
            }}
          />
        </div>

        <h2 className="flex items-center gap-2 text-label-lg text-white mt-6 mb-2">
          <AlignLeft size={20} /> Entradas para <code>input()</code>
        </h2>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Una línea por input()"
          className="w-full text-white bg-black/30 border border-white/10 rounded-xl p-3 outline-none placeholder:text-white/60"
        />

        {/* Feedback visual */}
        {renderFeedback()}

        {/* Botón de ejecución */}
        <Button
          variant="primary"
          size="large"
          onClick={onExecute}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 mt-6 rounded-xl hover:brightness-110 transition"
          disabled={timeLeft <= 0 || isExecuting || isLoading}
        >
          Ejecutar
        </Button>
      </div>

      {/* Salida */}
      <div className="p-6 rounded-2xl shadow-md border max-w-full
        bg-gray-100 border-gray-300 text-gray-900
        dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
      >
        <h2 className="flex items-center gap-2 text-label-lg mb-4">
          <TerminalSquare
            size={20}
            className="text-gray-700 dark:text-gray-300"
          /> 
          Salida
        </h2>
        <pre
          className={`p-5 rounded-md overflow-auto max-h-96 whitespace-pre-wrap
            font-mono text-base leading-relaxed border
            ${
              output.toLowerCase().includes('error')
                ? 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-300'
                : 'bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100'
            }
          `}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
};

export default PythonEditor;
