import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeEditorPage from "@/pages/student/CodeEditorPage";
import React from "react";

// Mock de Button y Editor para aislar el test
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
vi.mock("@monaco-editor/react", () => ({
    __esModule: true,
    default: ({ value, onChange, theme }) => (
        <textarea
            aria-label="editor"
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            data-theme={theme}
        />
    ),
}));

const executeCodeMock = vi.fn(() => Promise.resolve({ data: "Hola mundo" }));
vi.mock("@/shared/api/api", () => ({
    executeCode: executeCodeMock,
}));

describe("CodeEditorPage", () => {
    beforeEach(() => {
        executeCodeMock.mockClear();
    });

    it("renderiza el título, el editor y el botón", () => {
        render(<CodeEditorPage />);
        expect(screen.getByText(/editor de codigo python/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ejecutar/i })).toBeInTheDocument();
        expect(screen.getByLabelText("editor")).toBeInTheDocument();
        expect(screen.getByText(/salida/i)).toBeInTheDocument();
    });

    it("ejecuta el código y muestra la salida", async () => {
        render(<CodeEditorPage />);
        fireEvent.click(screen.getByRole("button", { name: /ejecutar/i }));
        await waitFor(() => {
            expect(executeCodeMock).toHaveBeenCalled();
            expect(screen.getByText(/hola mundo/i)).toBeInTheDocument();
        });
    });

    it("cambia el tema del editor al hacer clic en el icono de paleta", () => {
        render(<CodeEditorPage />);
        const editor = screen.getByLabelText("editor");
        const palette = screen.getByTestId("palette-icon");
        // Tema inicial: vs
        expect(editor.getAttribute("data-theme")).toBe("vs");
        fireEvent.click(palette);
        expect(editor.getAttribute("data-theme")).toBe("vs-dark");
        fireEvent.click(palette);
        expect(editor.getAttribute("data-theme")).toBe("hc-black");
        fireEvent.click(palette);
        expect(editor.getAttribute("data-theme")).toBe("vs");
    });

    it("actualiza el código al escribir en el editor", () => {
        render(<CodeEditorPage />);
        const editor = screen.getByLabelText("editor");
        fireEvent.change(editor, { target: { value: "print('Nuevo código')" } });
        expect(editor.value).toBe("print('Nuevo código')");
    });
});
