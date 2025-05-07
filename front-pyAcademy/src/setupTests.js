// Importa los matchers extendidos de Jest DOM (para toBeInTheDocument, etc.)
import '@testing-library/jest-dom/vitest';

// Opcional: Configuración adicional que puedas necesitar
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende los matchers de Vitest con los de Jest DOM
expect.extend(matchers);