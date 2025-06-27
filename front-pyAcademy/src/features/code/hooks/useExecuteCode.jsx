import { useState } from 'react';
//
import { executeCode } from '@/shared/api/api';

export const useExecuteCode = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [InfoOutput, setInfoOutput] = useState({});

  const handleExecuteCode = async () => {
    try {
      const res = await executeCode({
        code: code,
        inputs: input,
      });
      console.log(res);

      setInfoOutput(res.data);
      setOutput(res.data.success ? res.data.output : res.data.error);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleExecuteCodeWithPyodide = async (pyodide) => {
    if (!pyodide) {
      setOutput('Pyodide aún no está listo');
      return;
    }
    try {
      const inputLines = input.split('\n');
      let index = 0;

      pyodide.globals.set('input', () => {
        if (index >= inputLines.length) {
          throw new Error('No hay más entradas disponibles para input()');
        }
        return inputLines[index++];
      });

      let salida = '';
      pyodide.setStdout({ batched: (text) => (salida += text) });

      await pyodide.runPythonAsync(code);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return {
    code,
    setCode,
    output,
    setOutput,
    handleExecuteCodeWithPyodide,
    input,
    setInput,
    handleExecuteCode,
    InfoOutput,
  };
};
