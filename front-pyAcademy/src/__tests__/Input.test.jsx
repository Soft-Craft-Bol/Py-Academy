import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/shared/ui/atoms/Input";
import React from "react";

// Mock de los iconos para poder identificarlos
vi.mock("react-icons/fa", () => ({
    FaEye: (props) => <svg data-testid="icon-eye" {...props} />,
    FaEyeSlash: (props) => <svg data-testid="icon-eye-slash" {...props} />,
}));

describe("Input", () => {
    it("renderiza un input de texto y permite escribir", () => {
        const handleChange = vi.fn();
        render(<Input value="" onChange={handleChange} placeholder="Nombre" name="nombre" />);
        const input = screen.getByPlaceholderText("Nombre");
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "Juan" } });
        expect(handleChange).toHaveBeenCalled();
    });

    it("renderiza un input de contraseña con toggle de visibilidad", () => {
        const handleChange = vi.fn();
        render(
            <Input
                type="password"
                value=""
                onChange={handleChange}
                placeholder="Contraseña"
                name="password"
                showToggle={true}
            />
        );
        const input = screen.getByPlaceholderText("Contraseña");
        expect(input).toHaveAttribute("type", "password");
        // El icono de ojo debe estar presente
        expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
        // Cambia la visibilidad
        fireEvent.click(screen.getByTestId("icon-eye"));
        // Ahora el input debe ser de tipo text y el icono de ojo tachado debe aparecer
        expect(input).toHaveAttribute("type", "text");
        expect(screen.getByTestId("icon-eye-slash")).toBeInTheDocument();
    });

    it("no muestra el toggle si showToggle es false", () => {
        render(
            <Input
                type="password"
                value=""
                onChange={() => { }}
                placeholder="Contraseña"
                name="password"
                showToggle={false}
            />
        );
        expect(screen.queryByTestId("icon-eye")).not.toBeInTheDocument();
        expect(screen.queryByTestId("icon-eye-slash")).not.toBeInTheDocument();
    });
});
