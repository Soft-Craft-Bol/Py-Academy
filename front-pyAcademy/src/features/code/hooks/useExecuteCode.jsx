import React, { useState, useEffect } from 'react';

export const useExecuteCode = (pyodide) => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleExecuteCode = async () => {
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
  return { code, setCode, output, setOutput, input, setInput, handleExecuteCode };
};
