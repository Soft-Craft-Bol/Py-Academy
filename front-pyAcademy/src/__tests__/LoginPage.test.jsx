import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/pages/auth/login/LoginPage";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock de imagen para evitar errores de importación
vi.mock("@/assets/img/login.webp", () => ({ default: "login-image-mock" }));

// Mock de useNavigate
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

// Mock de useAuth
const mockLogin = vi.fn();
vi.mock("@/app/context/AuthContext", () => ({
    useAuth: () => ({ login: mockLogin, isLoading: false }),
}));

describe("LoginPage", () => {
    it("renderiza correctamente el formulario de login", () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it("llama a login y navega al enviar credenciales correctas", async () => {
        mockLogin.mockResolvedValueOnce();
        const mockNavigate = vi.fn();
        vi.mocked(require("react-router-dom")).useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "test@mail.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "123456" },
        });
        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: "test@mail.com",
                password: "123456",
            });
            expect(mockNavigate).toHaveBeenCalledWith("/student");
        });
    });

    it("muestra mensaje de error si login falla", async () => {
        mockLogin.mockRejectedValueOnce(new Error("Credenciales incorrectas"));
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "test@mail.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "wrongpass" },
        });
        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
        });
    });

    it("navega a registro al hacer clic en 'Regístrate'", () => {
        const mockNavigate = vi.fn();
        vi.mocked(require("react-router-dom")).useNavigate.mockReturnValue(mockNavigate);

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByRole("button", { name: /regístrate/i }));
        expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
});
