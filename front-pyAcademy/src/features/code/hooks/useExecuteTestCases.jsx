//React
import { toast } from 'react-toastify';

//Api
import { executeCode } from '@/shared/api/api';

//Util
import { explainPythonError } from '../utils/explainPythonError';

export const useExecuteTestCases = (setOutput, testCases, code, setInfoOutput) => {
  function isNumericString(str) {
    return typeof str === 'string' && str.trim() !== '' && !isNaN(str);
  }

  const handleExecuteTestCases = async () => {
    let allTestsPassed = true;
    let results = '';
    toast.info('Ejecutando casos de prueba...');

    for (let i = 0; i < testCases.length; i++) {
      try {
        let inputLines = '';

        if (!testCases[i].inputData || testCases[i].inputData.trim() === '') {
          inputLines = '';
        } else {
          const firstElement = testCases[i].inputData.split(' ')[0] || '';

          if (isNumericString(firstElement)) {
            inputLines = testCases[i].inputData.replace(/\s/g, '\n');
          } else {
            inputLines = testCases[i].inputData;
          }
        }

        let salida = '';

        console.log('El opbject es', {
          code: code,
          inputs: inputLines,
        });

        let res;
        try {
          res = await executeCode({
            code: code,
            inputs: inputLines,
          });
          setInfoOutput(res.data);
          salida = res.data.output;
          console.log('La salida es', res);
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        }

        if (res?.data) {
          if (res?.data?.error) {
            const friendlyMsg = explainPythonError(res.data.error) + '\n' + res?.data?.error;
            setOutput(friendlyMsg);
            return;
          }
        }

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

  const handleExecuteTestCasesWithPyodide = async (pyodide) => {
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
  return { handleExecuteTestCases, handleExecuteTestCasesWithPyodide };
};
