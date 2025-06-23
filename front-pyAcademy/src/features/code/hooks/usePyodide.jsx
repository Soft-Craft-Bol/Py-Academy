import React, { useEffect, useState } from 'react';

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      if (!window.loadPyodide) {
        setError('No se pudo cargar Pyodide. Verifica que esté en index.html');
        setIsLoading(false);
        return;
      }
      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);
      console.log('Pyodide cargado');
      setIsLoading(false);
    };
    load();
  }, []);
  return {
    pyodide,
    error,
    isLoading,
  };
};
