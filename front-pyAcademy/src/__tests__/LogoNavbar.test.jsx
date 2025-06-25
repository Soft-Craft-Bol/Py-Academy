import { render, screen } from "@testing-library/react";
import { LogoNavbar } from "@/shared/ui/atoms/LogoNavbar";
import React from "react";

describe("LogoNavbar", () => {
    it("renderiza la imagen y el título correctamente", () => {
        render(<LogoNavbar logo="/logo.png" title="PyAcademy" />);
        const img = screen.getByAltText(/pyacademy logo/i);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/logo.png");
        expect(screen.getByText("PyAcademy")).toBeInTheDocument();
    });

    it("muestra el título pasado por props", () => {
        render(<LogoNavbar logo="/logo.png" title="Mi Plataforma" />);
        expect(screen.getByText("Mi Plataforma")).toBeInTheDocument();
    });
});
