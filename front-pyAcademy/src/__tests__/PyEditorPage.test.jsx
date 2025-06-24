import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PythonEditor from "@/pages/student/PyEditorPage";
import React from "react";

// Mock de CodeMirror para aislar el test
vi.mock("@uiw/react-codemirror", () => ({
    __esModule: true,
    default: ({ value, onChange }) => (
        <textarea
            aria-label="editor"
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
        />
    ),
}));
vi.mock("@codemirror/lang-python", () => ({ python: () => { } }));

// Mock de Button para aislar el test
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe("PythonEditor", () => {
    beforeEach(() => {
        window.loadPyodide = undefined;
    });

    it("renderiza el título, el editor y el botón", () => {
        render(<PythonEditor />);
        expect(screen.getByText(/editor de codigo python/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ejecutar/i })).toBeInTheDocument();
        expect(screen.getByLabelText("editor")).toBeInTheDocument();
        expect(screen.getByText(/salida/i)).toBeInTheDocument();
    });

    it("muestra mensaje si Pyodide no está cargado", async () => {
        render(<PythonEditor />);
        fireEvent.click(screen.getByRole("button", { name: /ejecutar/i }));
        await waitFor(() => {
            expect(screen.getByText(/pyodide aún no está listo/i)).toBeInTheDocument();
        });
    });

    it("ejecuta código y muestra la salida si Pyodide está cargado", async () => {
        const runPythonAsync = vi.fn(async () => { });
        const setStdout = vi.fn();
        const globals = { set: vi.fn() };
        window.loadPyodide = vi.fn(async () => ({ runPythonAsync, setStdout, globals }));
        render(<PythonEditor />);
        // Espera a que Pyodide se cargue
        await waitFor(() => expect(window.loadPyodide).toHaveBeenCalled());
        // Escribe código y entrada
        fireEvent.change(screen.getByLabelText("editor"), { target: { value: "print('Hola')" } });
        fireEvent.change(screen.getByPlaceholderText(/una línea por input/i), { target: { value: "" } });
        fireEvent.click(screen.getByRole("button", { name: /ejecutar/i }));
        await waitFor(() => {
            expect(runPythonAsync).toHaveBeenCalled();
        });
    });
});
