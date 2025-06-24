import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Certificates from "@/pages/student/Certificates";
import React from "react";

// Mocks de imágenes y hooks de react-router-dom
vi.mock("@/assets/CertificateLogo.png", () => ({ default: "logo-mock" }));
vi.mock("@/assets/ManageCourses/python_basico.jpg", () => ({ default: "python-basico-mock" }));
vi.mock("@/assets/ManageCourses/estDatPy.jpg", () => ({ default: "estdatpy-mock" }));
vi.mock("@/assets/img/EjemploFirma.png", () => ({ default: "firma-mock" }));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        useLocation: () => ({ search: "" }),
    };
});

// Mock de html2canvas y jsPDF
vi.mock("html2canvas", () => ({
    __esModule: true,
    default: () => Promise.resolve({ toDataURL: () => "data:image/png;base64,MOCK" }),
}));
vi.mock("jspdf", () => {
    return {
        __esModule: true,
        default: class {
            constructor() { this.internal = { pageSize: { getWidth: () => 100, getHeight: () => 100 } }; }
            addImage() { }
            save() { }
        },
    };
});

describe("Certificates", () => {
    it("renderiza la lista de certificados disponibles", async () => {
        render(<Certificates />);
        await waitFor(() => {
            expect(screen.getByText(/certificados disponibles/i)).toBeInTheDocument();
            expect(screen.getByText(/python desde cero/i)).toBeInTheDocument();
            expect(screen.getByText(/estructuras de datos/i)).toBeInTheDocument();
        });
    });

    it("muestra el certificado al seleccionar uno (simulación de query param)", async () => {
        vi.mocked(require("react-router-dom")).useLocation.mockReturnValue({ search: "?cert=cert-001" });
        render(<Certificates />);
        await waitFor(() => {
            expect(screen.getByText(/certificado/i)).toBeInTheDocument();
            expect(screen.getByText(/rodrigo mauricio cespedes paredes/i)).toBeInTheDocument();
            expect(screen.getByText(/python desde cero/i)).toBeInTheDocument();
            expect(screen.getByText(/descargar pdf/i)).toBeInTheDocument();
            expect(screen.getByText(/compartir enlace/i)).toBeInTheDocument();
        });
    });
});
