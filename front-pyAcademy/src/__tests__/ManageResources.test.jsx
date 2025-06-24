import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResourceManager from "@/pages/ManageResources/ManageResources";
import React from "react";

describe("ResourceManager", () => {
    it("renderiza el título y el mensaje de recursos vacíos", () => {
        render(<ResourceManager />);
        expect(screen.getByText(/gestión de recursos/i)).toBeInTheDocument();
        expect(screen.getByText(/no hay recursos subidos aún/i)).toBeInTheDocument();
    });

    it("abre el selector de archivos al hacer clic en el área de drop", () => {
        render(<ResourceManager />);
        const input = screen.getByLabelText(/haz clic para buscar/i, { selector: 'input[type="file"]' });
        expect(input).toBeInTheDocument();
    });

    it("muestra un recurso subido válido en la lista", async () => {
        render(<ResourceManager />);
        const file = new File(["contenido"], "prueba.pdf", { type: "application/pdf" });
        const input = screen.getByLabelText(/haz clic para buscar/i, { selector: 'input[type="file"]' });
        // Simula la carga de archivo
        fireEvent.change(input, { target: { files: [file] } });
        await waitFor(() => {
            expect(screen.getByText(/prueba.pdf/i)).toBeInTheDocument();
        });
    });

    it("muestra un error si el archivo no es permitido", async () => {
        render(<ResourceManager />);
        const file = new File(["contenido"], "malicioso.exe", { type: "application/x-msdownload" });
        const input = screen.getByLabelText(/haz clic para buscar/i, { selector: 'input[type="file"]' });
        fireEvent.change(input, { target: { files: [file] } });
        await waitFor(() => {
            expect(screen.getByText(/tiene una extensión no permitida/i)).toBeInTheDocument();
        });
    });

    it("elimina un recurso de la lista", async () => {
        render(<ResourceManager />);
        const file = new File(["contenido"], "prueba.pdf", { type: "application/pdf" });
        const input = screen.getByLabelText(/haz clic para buscar/i, { selector: 'input[type="file"]' });
        fireEvent.change(input, { target: { files: [file] } });
        await waitFor(() => {
            expect(screen.getByText(/prueba.pdf/i)).toBeInTheDocument();
        });
        // Haz clic en el botón de eliminar
        fireEvent.click(screen.getByTitle(/eliminar/i));
        expect(screen.queryByText(/prueba.pdf/i)).not.toBeInTheDocument();
    });
});
