import { render, screen, fireEvent } from "@testing-library/react";
import CourseCardStudent from "@/pages/ExplorateCourses/components/CourseCardStudent";
import React from "react";

// Mock de useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("CourseCardStudent", () => {
    const course = {
        id: 1,
        imageUrl: "https://img.com/curso.jpg",
        title: "Curso de Python",
        teacher: "Prof. Juan",
        startDate: "2025-07-01",
        endDate: "2025-08-01",
        duration: "4 semanas",
        level: "Básico",
        price: 100,
        enrolled: 10,
        maxStudents: 30,
    };

    it("renderiza correctamente los datos del curso", () => {
        render(<CourseCardStudent course={course} />);
        expect(screen.getByAltText(course.title)).toBeInTheDocument();
        expect(screen.getByText(course.title)).toBeInTheDocument();
        expect(screen.getByText(/prof. juan/i)).toBeInTheDocument();
        expect(screen.getByText(/2025-07-01/i)).toBeInTheDocument();
        expect(screen.getByText(/2025-08-01/i)).toBeInTheDocument();
        expect(screen.getByText(/4 semanas/i)).toBeInTheDocument();
        expect(screen.getByText(/básico/i)).toBeInTheDocument();
        expect(screen.getByText(/\$100/i)).toBeInTheDocument();
        expect(screen.getByText(/10\/30/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ver más/i })).toBeInTheDocument();
    });

    it("navega al hacer clic en 'Ver más'", () => {
        const mockNavigate = vi.fn();
        vi.mocked(require("react-router-dom")).useNavigate.mockReturnValue(mockNavigate);
        render(<CourseCardStudent course={course} />);
        fireEvent.click(screen.getByRole("button", { name: /ver más/i }));
        expect(mockNavigate).toHaveBeenCalledWith(`/curso/${course.id}`);
    });
});
