import { render, screen, fireEvent } from "@testing-library/react";
import CourseStudent from "@/pages/student/CourseStudent";
import React from "react";

// Mock de useParams para simular el id del curso
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});

vi.mock("@/assets/course/Variables de python.png", () => ({ default: "var-python-mock" }));
vi.mock("@/assets/course/Estructuras de control.png", () => ({ default: "estructura-mock" }));
vi.mock("@/assets/course/Nuevo modulo.png", () => ({ default: "nuevo-modulo-mock" }));
vi.mock("@/assets/course/Webinars.png", () => ({ default: "webinars-mock" }));

describe("CourseStudent", () => {
    it("renderiza el título del curso y la pestaña de prácticas por defecto", () => {
        render(<CourseStudent />);
        expect(screen.getByText(/curso de python básico/i)).toBeInTheDocument();
        expect(screen.getByText(/práctica 1: variables en python/i)).toBeInTheDocument();
        expect(screen.getByText(/práctica 2: estructuras de control/i)).toBeInTheDocument();
    });

    it("cambia a la pestaña de noticias al hacer clic", () => {
        render(<CourseStudent />);
        fireEvent.click(screen.getByRole("button", { name: /noticias/i }));
        expect(screen.getByText(/nuevo módulo de ia disponible/i)).toBeInTheDocument();
        expect(screen.getByText(/webinar de desarrollo web este viernes/i)).toBeInTheDocument();
    });

    it("cambia a la pestaña de avisos al hacer clic", () => {
        render(<CourseStudent />);
        fireEvent.click(screen.getByRole("button", { name: /avisos/i }));
        expect(screen.getByText(/el sistema estará en mantenimiento/i)).toBeInTheDocument();
        expect(screen.getByText(/entrega de notas el 15\/06/i)).toBeInTheDocument();
    });

    it("cambia a la pestaña de materiales al hacer clic", () => {
        render(<CourseStudent />);
        fireEvent.click(screen.getByRole("button", { name: /materiales/i }));
        expect(screen.getByText(/slides semana 1/i)).toBeInTheDocument();
        expect(screen.getByText(/código de ejemplo/i)).toBeInTheDocument();
    });
});
