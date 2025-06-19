import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeEditorPage from "../pages/student/CodeEditorPage";
import { vi } from "vitest";
import * as api from "../shared/api/api";

vi.mock("@monaco-editor/react", () => ({
  default: () => <div data-testid="editor" />,
}));

vi.mock("../../shared/ui/atoms/Button", () => ({
  default: (props) => <button {...props}>{props.children}</button>,
}));

vi.mock("../shared/api/api", async () => {
  const actual = await vi.importActual("../shared/api/api");
  return {
    ...actual,
    executeCode: vi.fn(),
  };
});

describe("CodeEditorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente el título", () => {
    render(<CodeEditorPage />);
    expect(screen.getByText("Editor de codigo Python")).toBeInTheDocument();
  });

  it("cambia el tema al hacer clic en el icono de la paleta", () => {
    render(<CodeEditorPage />);
    const paletteIcon = screen.getByTestId("palette-icon");

    fireEvent.click(paletteIcon);
    fireEvent.click(paletteIcon);
    fireEvent.click(paletteIcon);
  });

  it("ejecuta el código y muestra la salida", async () => {
    api.executeCode.mockResolvedValue({ data: "Salida de prueba" });

    render(<CodeEditorPage />);

    const button = screen.getByText("Ejecutar");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Salida de prueba")).toBeInTheDocument();
    });

    expect(api.executeCode).toHaveBeenCalledTimes(1);
    expect(api.executeCode).toHaveBeenCalledWith(
      JSON.stringify({ code: "print('Hola mundo')" })
    );
  });
});
