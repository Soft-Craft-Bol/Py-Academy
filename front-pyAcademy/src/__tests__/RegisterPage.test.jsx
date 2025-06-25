import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import React from "react";

// Mocks de componentes y hooks
vi.mock("@/shared/ui/atoms/Input", () => ({
    __esModule: true,
    default: React.forwardRef((props, ref) => <input ref={ref} {...props} />),
}));
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
vi.mock("@/shared/ui/molecules/profile/ProfileImageUpload", () => ({
    __esModule: true,
    default: () => <div data-testid="profile-image-upload" />,
}));
vi.mock("@/shared/hooks/useAuth", () => ({
    useRegister: () => ({ mutate: vi.fn() }),
}));
vi.mock("@/app/validations/RegisterSchema", () => ({ RegisterSchema: {} }));

describe("RegisterPage", () => {
    it("renderiza el formulario de registro y los campos principales", () => {
        render(<RegisterPage />);
        expect(screen.getByText(/crear cuenta/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it("muestra el campo materia solo si el rol es docente", () => {
        render(<RegisterPage />);
        // Cambia el rol a docente
        fireEvent.click(screen.getByRole("button", { name: /docente/i }));
        expect(screen.getByLabelText(/materia/i)).toBeInTheDocument();
    });

    it("no muestra el campo materia si el rol es estudiante", () => {
        render(<RegisterPage />);
        fireEvent.click(screen.getByRole("button", { name: /estudiante/i }));
        expect(screen.queryByLabelText(/materia/i)).not.toBeInTheDocument();
    });

    it("llama a mutate al enviar el formulario", async () => {
        const { useRegister } = require("@/shared/hooks/useAuth");
        const mutateMock = vi.fn();
        useRegister.mockReturnValue({ mutate: mutateMock });
        render(<RegisterPage />);
        fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
        fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Pérez" } });
        fireEvent.change(screen.getByLabelText(/nombre de usuario/i), { target: { value: "juanp" } });
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "juan@mail.com" } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "123456" } });
        fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: "123456789" } });
        fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
        await waitFor(() => {
            expect(mutateMock).toHaveBeenCalled();
        });
    });
});
