import { render, screen } from "@testing-library/react";
import PublicCertificateViewer from "@/pages/student/PublicCertificateViewer";
import React from "react";

// Mock de useParams para simular el id del certificado
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ id: "cert-001" }),
    };
});

vi.mock("@/assets/CertificateLogo.png", () => ({ default: "logo-mock" }));
vi.mock("@/assets/ManageCourses/python_basico.jpg", () => ({ default: "python-basico-mock" }));
vi.mock("@/assets/ManageCourses/estDatPy.jpg", () => ({ default: "estdatpy-mock" }));
vi.mock("@/assets/img/EjemploFirma.png", () => ({ default: "firma-mock" }));

describe("PublicCertificateViewer", () => {
    it("renderiza los datos del certificado correctamente", () => {
        render(<PublicCertificateViewer />);
        expect(screen.getByText(/certificado/i)).toBeInTheDocument();
        expect(screen.getByText(/rodrigo mauricio cespedes paredes/i)).toBeInTheDocument();
        expect(screen.getByText(/python desde cero/i)).toBeInTheDocument();
        expect(screen.getByText(/aprende los fundamentos del lenguaje/i)).toBeInTheDocument();
        expect(screen.getByText(/8/i)).toBeInTheDocument();
        expect(screen.getByText(/15 de junio de 2025/i)).toBeInTheDocument();
        expect(screen.getByText(/vladimir costas/i)).toBeInTheDocument();
        expect(screen.getByText(/leticia blanco/i)).toBeInTheDocument();
    });

    it("muestra mensaje si el certificado no existe", () => {
        vi.mocked(require("react-router-dom")).useParams.mockReturnValue({ id: "cert-999" });
        render(<PublicCertificateViewer />);
        expect(screen.getByText(/certificado no encontrado/i)).toBeInTheDocument();
    });
});
