import { render, screen } from "@testing-library/react";
import Home from "@/pages/home/Home";
import React from "react";

// Mock de componentes hijos y saludo
vi.mock("@/shared/ui/organisms/FeatureGrid", () => ({
    __esModule: true,
    default: ({ title, subtitle, features }) => (
        <div>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            {features.map((f) => (
                <div key={f.title}>{f.title}</div>
            ))}
        </div>
    ),
}));
vi.mock("@/pages/home/components/HeroSection", () => ({
    __esModule: true,
    default: () => <div data-testid="hero-section">HeroSection</div>,
}));

const saludoMock = vi.fn(() => Promise.resolve({ data: "¡Hola Mundo!" }));
vi.mock("@/shared/api/api", () => ({
    saludo: saludoMock,
}));

describe("Home", () => {
    beforeEach(() => {
        saludoMock.mockClear();
    });

    it("renderiza el contenedor principal, HeroSection y FeatureGrid", () => {
        render(<Home />);
        expect(screen.getByTestId("home-page")).toBeInTheDocument();
        expect(screen.getByTestId("hero-section")).toBeInTheDocument();
        expect(screen.getByText(/características principales/i)).toBeInTheDocument();
        expect(screen.getByText(/todo lo que necesitas para dominar la programación/i)).toBeInTheDocument();
        expect(screen.getByText(/editor de código interactivo/i)).toBeInTheDocument();
        expect(screen.getByText(/lecciones en video/i)).toBeInTheDocument();
        expect(screen.getByText(/chat con ia/i)).toBeInTheDocument();
    });

    it("llama a saludo al montar el componente", () => {
        render(<Home />);
        expect(saludoMock).toHaveBeenCalledWith("Mundo");
    });
});
