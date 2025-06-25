import { render, screen } from "@testing-library/react";
import { NavigationLink } from "@/shared/ui/atoms/NavigationLink";
import React from "react";

// Mock de NavLink para controlar isActive
vi.mock("react-router-dom", () => ({
    NavLink: ({ to, children }) => children({ isActive: to === "/activo" }),
}));

describe("NavigationLink", () => {
    it("renderiza el texto y aplica clases normales cuando no está activo", () => {
        render(<NavigationLink text="Inicio" to="/inicio" />);
        expect(screen.getByText("Inicio")).toBeInTheDocument();
        const span = screen.getByText("Inicio");
        expect(span.className).not.toMatch(/text-blue-600/);
    });

    it("aplica la clase activa cuando la ruta coincide", () => {
        render(<NavigationLink text="Activo" to="/activo" />);
        const span = screen.getByText("Activo");
        expect(span.className).toMatch(/text-blue-600/);
    });

    it("renderiza el subrayado completo cuando está activo", () => {
        render(<NavigationLink text="Activo" to="/activo" />);
        const underline = screen.getByText("Activo").parentElement.querySelectorAll("span")[1];
        expect(underline.className).toMatch(/w-full/);
    });

    it("renderiza el subrayado oculto cuando no está activo", () => {
        render(<NavigationLink text="Inicio" to="/inicio" />);
        const underline = screen.getByText("Inicio").parentElement.querySelectorAll("span")[1];
        expect(underline.className).toMatch(/w-0/);
    });
});
