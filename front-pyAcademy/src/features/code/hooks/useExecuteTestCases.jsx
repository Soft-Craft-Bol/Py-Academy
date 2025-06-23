import React from 'react';
import { toast } from 'react-toastify';

export const useExecuteTestCases = (pyodide, setOutput, testCases, code) => {
  function isNumericString(str) {
    return typeof str === 'string' && str.trim() !== '' && !isNaN(str);
  }

  const handleExecuteTestCases = async () => {
    if (!pyodide) {
      setOutput('Pyodide aún no está listo');
      return;
    }
    let allTestsPassed = true;
    let results = '';
    toast.info('Ejecutando casos de prueba...');

    for (let i = 0; i < testCases.length; i++) {
      try {
        let inputLines = [];

        if (!testCases[i].inputData || testCases[i].inputData.trim() === '') {
          inputLines = [''];
        } else {
          const firstElement = testCases[i].inputData.split(' ')[0] || '';

          if (isNumericString(firstElement)) {
            inputLines = testCases[i].inputData
              .split(/[\s\n]+/)
              .filter((line) => line.trim() !== '');
          } else {
            inputLines = testCases[i].inputData.split(/[\n]+/);
          }
        }

        console.log('inputLines para test', i + 1, ':', inputLines);

        let index = 0;

        pyodide.globals.set('input', () => {
          if (index >= inputLines.length) {
            throw new Error(`No hay más entradas disponibles para input() en test ${i + 1}`);
          }
          return inputLines[index++];
        });

        let salida = '';
        pyodide.setStdout({ batched: (text) => (salida += text) });

        await pyodide.runPythonAsync(code);

        if (salida.trim() !== testCases[i].expectedOutput.trim()) {
          allTestsPassed = false;
          results += `Test ${i + 1}: FALLÓ\nEsperado: "${testCases[i].expectedOutput}"\nObtenido: "${salida.trim()}"\n\n`;
        } else {
          results += `Test ${i + 1}: PASÓ\n\n`;
        }
      } catch (error) {
        console.log('Error en test', i + 1, ':', error.message);
        allTestsPassed = false;
        results += `Test ${i + 1}: ERROR - ${error.message}\n\n`;
        break;
      }
    }

    setOutput(results);
    if (allTestsPassed) {
      toast.success('Todos los tests pasaron correctamente');
    } else {
      toast.error('Algunos tests fallaron');
    }
  };
  return { handleExecuteTestCases };
};
