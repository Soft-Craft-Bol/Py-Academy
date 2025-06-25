import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonTheme } from "@/shared/ui/atoms/ButtonTheme";
import React from "react";

// Mock de Button para aislar el test
vi.mock("@/shared/ui/atoms/Button", () => ({
    __esModule: true,
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe("ButtonTheme", () => {
    it("muestra el icono de sol si el tema es dark", () => {
        render(<ButtonTheme theme="dark" onChangeTheme={() => { }} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    });

    it("muestra el icono de luna si el tema es light", () => {
        render(<ButtonTheme theme="light" onChangeTheme={() => { }} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    });

    it("llama a onChangeTheme al hacer clic", () => {
        const handleChange = vi.fn();
        render(<ButtonTheme theme="dark" onChangeTheme={handleChange} />);
        fireEvent.click(screen.getByRole("button"));
        expect(handleChange).toHaveBeenCalled();
    });
});

// Mock de los iconos para poder identificarlos por testid
vi.mock("react-icons/md", () => ({
    MdWbSunny: (props) => <svg data-testid="icon-sun" {...props} />,
}));
vi.mock("react-icons/bs", () => ({
    BsMoonStarsFill: (props) => <svg data-testid="icon-moon" {...props} />,
}));
