export const explainPythonError = (errorMsg) => {
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