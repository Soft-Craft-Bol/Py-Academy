import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "@/pages/home/components/HeroSection";
import React from "react";

// Mock de Button y heroImage para evitar errores de importación
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
vi.mock("@/assets/img/heroImage.png", () => ({ default: "hero-image-mock" }));

describe("HeroSection", () => {
    it("renderiza el título, el párrafo, el botón y la imagen", () => {
        render(<HeroSection />);
        expect(screen.getByText(/domina python con ia/i)).toBeInTheDocument();
        expect(screen.getByText(/descubre una forma revolucionaria/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /comenzar ahora/i })).toBeInTheDocument();
        expect(screen.getByAltText(/estudiante programando/i)).toBeInTheDocument();
    });

    it("ejecuta la función al hacer clic en el botón", () => {
        const logSpy = vi.spyOn(console, "log");
        render(<HeroSection />);
        fireEvent.click(screen.getByRole("button", { name: /comenzar ahora/i }));
        expect(logSpy).toHaveBeenCalledWith("Registrarse");
        logSpy.mockRestore();
    });
});
