import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonBurguer } from "@/shared/ui/atoms/ButtonBurguer";
import React from "react";

describe("ButtonBurguer", () => {
    it("renderiza el botón y el icono de menú hamburguesa por defecto", () => {
        render(<ButtonBurguer isMenuOpen={false} onClick={() => { }} />);
        const button = screen.getByRole("button", { name: /menú principal/i });
        expect(button).toBeInTheDocument();
        // Icono hamburguesa: tres líneas
        expect(button.querySelectorAll("path")[0].getAttribute("d")).toBe("M4 6h16M4 12h16M4 18h16");
    });

    it("renderiza el icono de cerrar cuando isMenuOpen es true", () => {
        render(<ButtonBurguer isMenuOpen={true} onClick={() => { }} />);
        const button = screen.getByRole("button", { name: /menú principal/i });
        // Icono de cerrar: X
        expect(button.querySelectorAll("path")[0].getAttribute("d")).toBe("M6 18L18 6M6 6l12 12");
    });

    it("llama a onClick al hacer clic", () => {
        const handleClick = vi.fn();
        render(<ButtonBurguer isMenuOpen={false} onClick={handleClick} />);
        const button = screen.getByRole("button", { name: /menú principal/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });
});
