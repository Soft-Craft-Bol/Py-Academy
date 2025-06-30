//React
import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import { useContext } from 'react';

// Components
import Button from '../../shared/ui/atoms/Button';
import { LoaderCircle, TimerReset, TerminalSquare, AlignLeft, Code2 } from 'lucide-react';

// Hooks
import { useTimeLimit } from '@/features/exercises/hooks/useTimeLimit';
import { useCodeExecution } from '@/features/code/hooks/useCodeExecution';

// Utils
import { explainPythonError } from '@/features/code/utils/explainPythonError';

//Context
import { ThemeContext } from '@/app/context/ThemeContext';

const PythonEditor = ({ title = true, testCases = [], timeLimit }) => {
  const {
    code,
    setCode,
    output,
    input,
    setInput,
    handleExecuteCode,
    handleExecuteTestCases,
    InfoOutput,
    isExecuting,
    setIsExecuting,
  } = useCodeExecution(testCases);

  const { timeLeft, timerStarted, setTimerStarted } = useTimeLimit(timeLimit);
  const { theme } = useContext(ThemeContext);

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
    <div className="mx-auto w-full max-w-6xl space-y-10">
      {title && (
        <h1 className="p-1 rounded-lg text-center font-bold text-title-lg dark:text-white mb-5">
          Editor de codigo Python
        </h1>
      )}

      {timeLimit && (
        <div className="flex items-center gap-2 text-white text-lg font-medium">
          <TimerReset className="text-yellow-400" size={20} />
          Tiempo restante: <span className="text-yellow-300">{timeLeft}s</span>
        </div>
      )}

      <div className="bg-primary-pri3 dark:bg-primary-pri4 p-6 rounded-2xl shadow-lg shadow-blue-800/30">
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
            theme={theme}
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
              color: 'blue',
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
          className="text-title-sm dark:bg-[#282c34] w-full dark:text-white text-black border border-white/10 rounded-xl p-3 outline-none placeholder:text-white/60 resize-none"
        />

        {renderFeedback()}

        <Button
          variant="primary"
          size="large"
          onClick={onExecute}
          className="bg-primary-pri1 text-white px-6 py-2 mt-6 rounded-xl hover:brightness-110 transition"
          disabled={timeLeft <= 0 || isExecuting}
        >
          Ejecutar
        </Button>
      </div>

      <div
        className="p-6 rounded-2xl border max-w-full
        border-gray-300 text-gray-100 shadow-lg shadow-blue-800/30
        bg-primary-pri3 dark:bg-primary-pri4 dark:border-gray-700"
      >
        <div className="flex justify-between">
          <h2 className="flex items-center gap-2 text-label- mb-4">
            <TerminalSquare size={20} className="text-gray-300" />
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
                : 'bg-white border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-100'
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
