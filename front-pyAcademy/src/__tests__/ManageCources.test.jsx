import { render, screen, fireEvent } from "@testing-library/react";
import ManageCourses from "@/pages/ManageCourses/ManageCourses";
import React from "react";

// Mock de CourseCard para aislar el test
vi.mock("@/pages/ManageCourses/components/CourseCard", () => ({
    __esModule: true,
    default: ({ title, description }) => (
        <div data-testid="course-card">
            <span>{title}</span>
            <span>{description}</span>
        </div>
    ),
}));

describe("ManageCourses", () => {
    it("renderiza el título y la cantidad correcta de cursos", () => {
        render(<ManageCourses />);
        expect(screen.getByText(/mis cursos creados/i)).toBeInTheDocument();
        // Deben renderizarse 5 tarjetas de curso
        expect(screen.getAllByTestId("course-card")).toHaveLength(5);
        expect(screen.getByText(/curso de python básico/i)).toBeInTheDocument();
        expect(screen.getByText(/curso de desarrollo web/i)).toBeInTheDocument();
    });

    it("abre el modal de creación al hacer clic en 'Crear curso'", () => {
        render(<ManageCourses />);
        fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));
        expect(screen.getByText(/crear nuevo curso/i)).toBeInTheDocument();
    });

    it("crea un nuevo curso y lo muestra en la lista", () => {
        render(<ManageCourses />);
        fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));
        fireEvent.change(screen.getByPlaceholderText(/título/i), { target: { value: "Nuevo curso" } });
        fireEvent.change(screen.getByPlaceholderText(/descripción/i), { target: { value: "Descripción del nuevo curso" } });
        fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
        expect(screen.getByText(/nuevo curso/i)).toBeInTheDocument();
        expect(screen.getAllByTestId("course-card")).toHaveLength(6);
    });
});
