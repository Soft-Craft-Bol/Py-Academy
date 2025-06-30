//React
import { useState } from 'react';

//Hooks
import { useExecuteCode } from './useExecuteCode';
import { useExecuteTestCases } from './useExecuteTestCases';

export const useCodeExecution = (testCases = []) => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [InfoOutput, setInfoOutput] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);

  const { handleExecuteCode, handleExecuteCodeWithPyodide } = useExecuteCode(
    code,
    input,
    setOutput,
    setInfoOutput
  );

  const { handleExecuteTestCases, handleExecuteTestCasesWithPyodide } = useExecuteTestCases(
    setOutput,
    testCases,
    code,
    setInfoOutput
  );

  return {
    handleExecuteCode,
    handleExecuteCodeWithPyodide,
    handleExecuteTestCases,
    handleExecuteTestCasesWithPyodide,
    code,
    setCode,
    input,
    setInput,
    output,
    setOutput,
    InfoOutput,
    setInfoOutput,
    isExecuting,
    setIsExecuting,
  };
};
