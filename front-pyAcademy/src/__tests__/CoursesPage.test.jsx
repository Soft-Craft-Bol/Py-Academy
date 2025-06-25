import { render, screen, fireEvent } from "@testing-library/react";
import CoursesPage from "@/pages/student/CoursesPage";
import React from "react";

// Mock de useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

vi.mock("@/assets/ManageCourses/pyWeb.jpeg", () => ({ default: "pyweb-mock" }));
vi.mock("@/assets/ManageCourses/estDatPy.jpg", () => ({ default: "estdatpy-mock" }));
vi.mock("@/assets/ManageCourses/python_basico.jpg", () => ({ default: "python-basico-mock" }));

describe("CoursesPage", () => {
    it("renderiza el título y la cantidad correcta de cursos", () => {
        render(<CoursesPage />);
        expect(screen.getByText(/mis cursos/i)).toBeInTheDocument();
        expect(screen.getByText(/curso de python básico/i)).toBeInTheDocument();
        expect(screen.getByText(/curso de estructuras de datos/i)).toBeInTheDocument();
        expect(screen.getByText(/desarrollo web/i)).toBeInTheDocument();
        // Deben renderizarse 3 tarjetas de curso
        expect(screen.getAllByRole("img")).toHaveLength(3);
    });

    it("navega al hacer clic en una tarjeta de curso", () => {
        const mockNavigate = vi.fn();
        vi.mocked(require("react-router-dom")).useNavigate.mockReturnValue(mockNavigate);
        render(<CoursesPage />);
        const card = screen.getByText(/curso de python básico/i).closest("div[onClick]");
        fireEvent.click(card);
        expect(mockNavigate).toHaveBeenCalledWith("/student/curso/1");
    });
});
