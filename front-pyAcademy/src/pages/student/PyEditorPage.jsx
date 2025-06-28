import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from 'react';

// Components
import Button from '../../shared/ui/atoms/Button';
import { LoaderCircle, TimerReset, TerminalSquare, AlignLeft, Code2 } from 'lucide-react';

// Hooks
import { usePyodide } from '@/features/code/hooks/usePyodide';
import { useExecuteCode } from '@/features/code/hooks/useExecuteCode';
import { useExecuteTestCases } from '@/features/code/hooks/useExecuteTestCases';

const PythonEditor = ({ title = true, testCases = [], timeLimit }) => {
  const { pyodide, error, isLoading } = usePyodide();
  const { code, setCode, output, setOutput, input, setInput, handleExecuteCode, InfoOutput } =
    useExecuteCode();
  const { handleExecuteTestCases } = useExecuteTestCases(pyodide, setOutput, testCases, code);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  const explainPythonError = (errorMsg) => {
    const msg = errorMsg.toLowerCase();
    const execLineMatch = errorMsg.match(/File "<exec>", line (\d+)/i);
    const line = execLineMatch ? execLineMatch[1] : '?';

    if (msg.includes('syntaxerror')) {
      if (msg.includes('unexpected eof while parsing')) {
        return `Error de sintaxis: falta cerrar alguna estructura (paréntesis, comillas, corchetes) cerca de la línea ${line}.`;
      }
      if (msg.includes('unexpected indent')) {
        return `Error de sintaxis: indentación inesperada en la línea ${line}. Revisa la sangría.`;
      }
      if (msg.includes('invalid syntax')) {
        return `Error de sintaxis en la línea ${line}. Verifica la estructura y símbolos del código.`;
      }
      return `Error de sintaxis en la línea ${line}.`;
    }

    if (msg.includes('nameerror')) {
      const nameMatch = errorMsg.match(/name ['"](.+?)['"]/i);
      const name = nameMatch ? nameMatch[1] : 'variable desconocida';
      return `Error: nombre no definido '${name}'. Asegúrate de que esté declarado antes de usarlo.`;
    }

    if (msg.includes('indentationerror')) {
      return `Error de indentación en la línea ${line}. Revisa que uses espacios o tabuladores de forma consistente.`;
    }

    if (msg.includes('typeerror')) {
      return `Error de tipo: verifica las operaciones y tipos de datos en tu código.`;
    }

    if (msg.includes('valueerror')) {
      return `Error de valor: alguno de los valores no es válido o está fuera de rango.`;
    }

    if (msg.includes('indexerror')) {
      return `Error de índice: intentaste acceder a una posición que no existe en una lista o cadena.`;
    }

    if (msg.includes('keyerror')) {
      return `Error de clave: la clave indicada no existe en el diccionario.`;
    }

    if (msg.includes('importerror')) {
      return `Error de importación: un módulo o paquete requerido no pudo ser cargado.`;
    }

    return `Error inesperado: ${errorMsg}`;
  };

  const cleanOutput = (rawOutput) => {
    if (!rawOutput) return '';

    const lines = rawOutput.split('\n');
    const filteredLines = [];
    let showNextLine = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (/File "<exec>", line \d+/.test(line)) {
        filteredLines.push(line);
        showNextLine = true; // para mostrar la línea siguiente (normalmente la línea de error)
        continue;
      }

      if (showNextLine) {
        filteredLines.push(line);
        showNextLine = false;
        continue;
      }

      if (
        /^(IndentationError|SyntaxError|NameError|TypeError|ValueError|IndexError|KeyError|ImportError|.*Error):/.test(
          line.trim()
        )
      ) {
        filteredLines.push(line);
        continue;
      }
    }

    return filteredLines.join('\n');
  };

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
      if (isError) {
        const friendlyMsg = explainPythonError(output);
        return (
          <div className="my-4 font-semibold px-4 py-2 rounded-lg border-l-4 text-red-300 bg-red-800/30 border-red-500">
            ❌ {friendlyMsg}
          </div>
        );
      }
      return (
        <div className="my-4 font-semibold px-4 py-2 rounded-lg border-l-4 text-green-300 bg-green-800/30 border-green-500">
          ✔️ Ejecución exitosa
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" mx-auto px-4 w-full max-w-7xl space-y-10">
      {title && (
        <h1 className="p-1 rounded-lg text-center font-bold text-title-lg dark:text-white mb-5">
          Editor de codigo Python
        </h1>
      )}

      {/* Temporizador */}
      {timeLimit && (
        <div className="flex items-center gap-2 text-white text-lg font-medium">
          <TimerReset className="text-yellow-400" size={20} />
          Tiempo restante: <span className="text-yellow-300">{timeLeft}s</span>
        </div>
      )}

      <div className="bg-primary-pri4 p-6 rounded-2xl shadow-lg shadow-blue-800/30">
        <h2 className="flex items-center gap-2 text-label-md text-white mb-3">
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

        <h2 className="flex items-center gap-2 text-label-md text-white mt-6 mb-2">
          <AlignLeft size={20} /> Entradas para <code>input()</code>
        </h2>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Una línea por input()"
          className="w-full text-white bg-[#282c34] border border-white/10 rounded-xl p-3 outline-none placeholder:text-white/60 resize-none"
        />

        {renderFeedback()}

        <Button
          variant="primary"
          size="large"
          onClick={onExecute}
          className="bg-primary-pri1 text-white px-6 py-2 mt-6 rounded-xl hover:brightness-110 transition"
          disabled={timeLeft <= 0 || isExecuting || isLoading}
        >
          Ejecutar
        </Button>
      </div>

      <div
        className="p-6 rounded-2xl border max-w-full
        bg-gray-100 border-gray-300 text-gray-900 shadow-lg shadow-blue-800/30
        dark:bg-primary-pri4 dark:border-gray-700 dark:text-gray-100"
      >
        <div className="flex justify-between">
          <h2 className="flex items-center gap-2 text-label- mb-4">
            <TerminalSquare size={20} className="text-gray-700 dark:text-gray-300" />
            Salida
          </h2>
          <p className="text-yellow-300">
            Tiempo de Ejecución: {InfoOutput?.metrics?.executionTimeMs}ms
          </p>
        </div>
        <pre
          className={`dark:bg-[#282c34] p-5 rounded-md overflow-auto max-h-96 whitespace-pre-wrap
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
