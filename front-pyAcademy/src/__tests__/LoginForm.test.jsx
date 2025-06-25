import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";
import { vi } from "vitest";

describe("LoginForm", () => {
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it("renderiza los campos y el botón", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it("permite escribir en los campos y envía los datos", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "test@mail.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: "test@mail.com",
            password: "123456",
        });
    });

    it("muestra mensaje de error si se pasa la prop error", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={mockOnSubmit} error="Credenciales incorrectas" />
            </MemoryRouter>
        );
        expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });

    it("deshabilita los campos y muestra 'Cargando...' cuando isLoading es true", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={mockOnSubmit} isLoading={true} />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/correo electrónico/i)).toBeDisabled();
        expect(screen.getByLabelText(/contraseña/i)).toBeDisabled();
        expect(screen.getByRole("button", { name: /cargando/i })).toBeDisabled();
    });

    it("no permite enviar el formulario si isLoading es true", () => {
        render(
            <MemoryRouter>
                <LoginForm onSubmit={mockOnSubmit} isLoading={true} />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByRole("button", { name: /cargando/i }));
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
});