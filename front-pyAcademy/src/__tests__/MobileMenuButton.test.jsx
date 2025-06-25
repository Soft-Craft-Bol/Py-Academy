import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenuButton } from "@/shared/ui/atoms/MobileMenuButton";
import React from "react";

// Mock de FiMenu para identificarlo por testid
vi.mock("react-icons/fi", () => ({
    FiMenu: (props) => <svg data-testid="icon-menu" {...props} />,
}));

describe("MobileMenuButton", () => {
    it("renderiza el botón y el icono de menú", () => {
        render(<MobileMenuButton onToggleMenu={() => { }} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId("icon-menu")).toBeInTheDocument();
    });

    it("llama a onToggleMenu al hacer clic", () => {
        const handleToggle = vi.fn();
        render(<MobileMenuButton onToggleMenu={handleToggle} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(handleToggle).toHaveBeenCalled();
    });
});
