import { render, screen } from "@testing-library/react";
import ExercisePage from "@/pages/student/ExercisePage";
import React from "react";

// Mock de useLocation para simular el estado con datos de ejercicio
const mockData = {
    title: "Suma de dos números",
    description: "Crea una función que sume dos números.",
    instruction: "La función debe retornar la suma de los dos parámetros.",
    category: "Principiante",
    testCase: {
        description: "Entrada: 2, 3. Salida esperada: 5",
        input: "2, 3",
        output: "5",
    },
};

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useLocation: () => ({ state: { data: mockData } }),
        NavLink: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    };
});

// Mock de PythonEditor para aislar el test
vi.mock("@/pages/student/PyEditorPage", () => ({
    __esModule: true,
    default: () => <div data-testid="python-editor">PythonEditor</div>,
}));

describe("ExercisePage", () => {
    it("renderiza los datos del ejercicio y los encabezados", () => {
        render(<ExercisePage />);
        expect(screen.getByText(/volver a ejercicios/i)).toBeInTheDocument();
        expect(screen.getByText(/suma de dos números/i)).toBeInTheDocument();
        expect(screen.getByText(/principiante/i)).toBeInTheDocument();
        expect(screen.getByText(/descripción/i)).toBeInTheDocument();
        expect(screen.getByText(/instrucciones/i)).toBeInTheDocument();
        expect(screen.getByText(/casos de prueba/i)).toBeInTheDocument();
        expect(screen.getByText(/crea una función que sume dos números/i)).toBeInTheDocument();
        expect(screen.getByText(/la función debe retornar la suma/i)).toBeInTheDocument();
        expect(screen.getByText(/entrada: 2, 3/i)).toBeInTheDocument();
        expect(screen.getByText(/salida/i)).toBeInTheDocument();
        expect(screen.getByTestId("python-editor")).toBeInTheDocument();
    });
});
