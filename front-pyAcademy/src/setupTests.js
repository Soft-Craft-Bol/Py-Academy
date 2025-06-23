// Importa los matchers extendidos de Jest DOM (para toBeInTheDocument, etc.)
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';
// Opcional: Configuración adicional que puedas necesitar
import { expect } from 'vitest';

// Extiende los matchers de Vitest con los de Jest DOM
expect.extend(matchers);
