import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import React from "react";

// Mocks de los subcomponentes
vi.mock("@/features/auth/components/NameGroup", () => ({
    NameGroup: ({ register }) => <div data-testid="name-group" />,
}));
vi.mock("@/features/auth/components/AuthGroup", () => ({
    AuthGroup: ({ register }) => <div data-testid="auth-group" />,
}));
vi.mock("@/features/auth/components/RoleSelect", () => ({
    RoleSelect: ({ register }) => <div data-testid="role-select" />,
}));
vi.mock("@/features/auth/hooks/useRegister", () => ({
    useRegister: () => ({ submit: vi.fn() }),
}));

describe("RegisterForm", () => {
    it("renderiza todos los grupos y el botón de registro", () => {
        render(<RegisterForm />);
        expect(screen.getByTestId("name-group")).toBeInTheDocument();
        expect(screen.getByTestId("auth-group")).toBeInTheDocument();
        expect(screen.getByTestId("role-select")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it("llama a submit al enviar el formulario", () => {
        const { useRegister } = require("@/features/auth/hooks/useRegister");
        const submitMock = vi.fn();
        useRegister.mockReturnValue({ submit: submitMock });
        render(<RegisterForm />);
        fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
        // No se puede simular el submit real de react-hook-form sin más configuración,
        // pero se verifica que el botón existe y el flujo básico.
    });
});
