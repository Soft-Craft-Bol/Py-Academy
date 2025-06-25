import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/shared/ui/atoms/Button";
import React from "react";

// Mock de Link de react-router-dom
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        Link: ({ to, state, className, children }) => (
            <a href={to} data-state={JSON.stringify(state)} className={className} data-testid="link-mock">{children}</a>
        ),
        useNavigate: () => vi.fn(),
    };
});

describe("Button", () => {
    it("renderiza el texto y ejecuta onClick", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const btn = screen.getByRole("button", { name: /click me/i });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalled();
    });

    it("renderiza como un Link si se pasa 'to'", () => {
        render(<Button to="/ruta" data={{ foo: "bar" }}>Ir</Button>);
        const link = screen.getByTestId("link-mock");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/ruta");
        expect(link).toHaveAttribute("data-state", JSON.stringify({ foo: "bar" }));
        expect(link).toHaveTextContent("Ir");
    });

    it("aplica la clase de variante y tamaño correctamente", () => {
        render(<Button variant="danger" size="lg">Eliminar</Button>);
        const btn = screen.getByRole("button", { name: /eliminar/i });
        expect(btn.className).toMatch(/bg-red-500/);
        expect(btn.className).toMatch(/px-6/);
    });

    it("muestra los iconos izquierdo y derecho si se pasan", () => {
        render(<Button iconLeft={<span data-testid="icon-left">L</span>} iconRight={<span data-testid="icon-right">R</span>}>Texto</Button>);
        expect(screen.getByTestId("icon-left")).toBeInTheDocument();
        expect(screen.getByTestId("icon-right")).toBeInTheDocument();
    });

    it("deshabilita el botón si disabled es true", () => {
        render(<Button disabled>Deshabilitado</Button>);
        const btn = screen.getByRole("button", { name: /deshabilitado/i });
        expect(btn).toBeDisabled();
        expect(btn.className).toMatch(/opacity-60/);
    });
});
