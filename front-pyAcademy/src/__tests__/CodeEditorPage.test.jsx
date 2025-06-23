import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { expect, describe, it, beforeEach } from 'vitest'; 

import CodeEditorPage from '../pages/student/CodeEditorPage';
import * as api from '../shared/api/api';

// Mocks
vi.mock('@monaco-editor/react', () => ({
  default: () => <div data-testid="editor" />,
}));

vi.mock('../../shared/ui/atoms/Button', () => ({
  default: (props) => <button {...props}>{props.children}</button>,
}));

vi.mock('../shared/api/api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    executeCode: vi.fn(),
  };
});

describe('CodeEditorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock inicial del código en el editor
    window.MonacoEnvironment = {
      getWorker: vi.fn(),
    };
  });

  it('renderiza correctamente el título', () => {
    render(<CodeEditorPage />);
    expect(screen.getByText('Editor de codigo Python')).toBeInTheDocument();
  });

  it('cambia el tema al hacer clic en el icono de la paleta', () => {
    render(<CodeEditorPage />);
    const paletteIcon = screen.getByTestId('palette-icon');

    fireEvent.click(paletteIcon);
    fireEvent.click(paletteIcon);
    fireEvent.click(paletteIcon);

    // Deberías añadir alguna expectativa aquí
    // Por ejemplo, verificar que se llamó a alguna función de cambio de tema
  });

  it('ejecuta el código y muestra la salida', async () => {
    const mockResponse = { data: 'Salida de prueba' };
    api.executeCode.mockResolvedValue(mockResponse);

    render(<CodeEditorPage />);

    const button = screen.getByRole('button', { name: /ejecutar/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(mockResponse.data)).toBeInTheDocument();
    });

    expect(api.executeCode).toHaveBeenCalledTimes(1);
    expect(api.executeCode).toHaveBeenCalledWith(
      expect.objectContaining({
        code: expect.any(String),
      })
    );
  });

  it('maneja errores al ejecutar el código', async () => {
    const errorMessage = 'Error de ejecución';
    api.executeCode.mockRejectedValue(new Error(errorMessage));

    render(<CodeEditorPage />);

    const button = screen.getByRole('button', { name: /ejecutar/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
