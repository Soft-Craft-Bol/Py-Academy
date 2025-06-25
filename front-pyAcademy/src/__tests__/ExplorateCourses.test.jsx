import { render, screen } from "@testing-library/react";
import StudentCourses from "@/pages/ExplorateCourses/ExplorateCourses";
import React from "react";

// Mock del componente CourseCardStudent para aislar el test
vi.mock("@/pages/ExplorateCourses/components/CourseCardStudent", () => ({
    __esModule: true,
    default: ({ course }) => <div data-testid="course-card">{course.title}</div>,
}));

describe("StudentCourses", () => {
    it("renderiza el título y la cantidad correcta de cursos", () => {
        render(<StudentCourses />);
        expect(screen.getByText(/cursos disponibles/i)).toBeInTheDocument();
        // Deben renderizarse 10 tarjetas de curso
        expect(screen.getAllByTestId("course-card")).toHaveLength(10);
        // Verifica que algunos títulos estén presentes
        expect(screen.getByText(/curso de python básico/i)).toBeInTheDocument();
        expect(screen.getByText(/desarrollo web/i)).toBeInTheDocument();
        expect(screen.getByText(/git y control de versiones/i)).toBeInTheDocument();
    });
});
