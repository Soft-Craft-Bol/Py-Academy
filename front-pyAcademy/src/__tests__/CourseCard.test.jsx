import { render, screen, fireEvent } from "@testing-library/react";
import CourseCard from "@/pages/ManageCourses/components/CourseCard";
import React from "react";

// Mock de useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe("CourseCard", () => {
    const defaultProps = {
        id: 1,
        title: "Curso de React",
        description: "Aprende React desde cero.",
        imageUrl: "https://img.com/curso.jpg",
        onEdit: vi.fn(),
        onDelete: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza el título, descripción e imagen", () => {
        render(<CourseCard {...defaultProps} />);
        expect(screen.getByText(/curso de react/i)).toBeInTheDocument();
        expect(screen.getByText(/aprende react desde cero/i)).toBeInTheDocument();
        expect(screen.getByAltText(/curso de react/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ver más/i })).toBeInTheDocument();
    });

    it("abre el menú y muestra opciones de editar y eliminar", () => {
        render(<CourseCard {...defaultProps} />);
        fireEvent.click(screen.getByText("⋮"));
        expect(screen.getByText(/editar/i)).toBeInTheDocument();
        expect(screen.getByText(/eliminar curso/i)).toBeInTheDocument();
    });

    it("abre el modal de edición y guarda cambios", () => {
        render(<CourseCard {...defaultProps} />);
        fireEvent.click(screen.getByText("⋮"));
        fireEvent.click(screen.getByText(/editar/i));
        expect(screen.getByText(/editar curso/i)).toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText(/título/i), { target: { value: "Nuevo título" } });
        fireEvent.change(screen.getByPlaceholderText(/descripción/i), { target: { value: "Nueva descripción" } });
        fireEvent.click(screen.getByText(/guardar/i));
        expect(defaultProps.onEdit).toHaveBeenCalledWith({
            title: "Nuevo título",
            description: "Nueva descripción",
            imageUrl: defaultProps.imageUrl,
        });
    });

    it("abre el modal de confirmación y elimina el curso", () => {
        render(<CourseCard {...defaultProps} />);
        fireEvent.click(screen.getByText("⋮"));
        fireEvent.click(screen.getByText(/eliminar curso/i));
        expect(screen.getByText(/¿eliminar este curso/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/eliminar$/i));
        expect(defaultProps.onDelete).toHaveBeenCalled();
    });
});
