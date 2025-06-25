import { render, screen } from "@testing-library/react";
import { ExcerciseCard } from "@/pages/student/components/ExcerciseCard";
import React from "react";

// Mock de Button para aislar el test
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children }) => <button>{children}</button>,
}));

describe("ExcerciseCard", () => {
    const exercise = {
        title: "Variables en Python",
        description: "Crea y usa variables básicas en Python.",
        category: "Principiante",
        tags: ["python", "variables", "básico"],
    };

    it("renderiza el título, descripción, categoría y tags", () => {
        render(<ExcerciseCard exercise={exercise} btnText="Resolver" />);
        expect(screen.getByText(/variables en python/i)).toBeInTheDocument();
        expect(screen.getByText(/crea y usa variables básicas en python/i)).toBeInTheDocument();
        expect(screen.getByText(/principiante/i)).toBeInTheDocument();
        expect(screen.getByText(/python,/i)).toBeInTheDocument();
        expect(screen.getByText(/variables,/i)).toBeInTheDocument();
        expect(screen.getByText(/básico,/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /resolver/i })).toBeInTheDocument();
    });

    it("renderiza correctamente la categoría Intermedio", () => {
        render(<ExcerciseCard exercise={{ ...exercise, category: "Intermedio" }} btnText="Intentar" />);
        expect(screen.getByText(/intermedio/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /intentar/i })).toBeInTheDocument();
    });

    it("renderiza correctamente la categoría Avanzado", () => {
        render(<ExcerciseCard exercise={{ ...exercise, category: "Avanzado" }} btnText="Ver" />);
        expect(screen.getByText(/avanzado/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /ver/i })).toBeInTheDocument();
    });
});
