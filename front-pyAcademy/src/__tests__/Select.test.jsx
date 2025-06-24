import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@/shared/ui/atoms/Select";
import React from "react";

describe("Select", () => {
    const options = [
        { value: "option1", label: "Opción 1" },
        { value: "option2", label: "Opción 2" },
    ];

    it("renderiza correctamente con placeholder y opciones", () => {
        render(
            <Select
                id="test-select"
                name="testSelect"
                options={options}
                placeholder="Selecciona una opción"
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByText("Selecciona una opción")).toBeInTheDocument();
        expect(screen.getByText("Opción 1")).toBeInTheDocument();
        expect(screen.getByText("Opción 2")).toBeInTheDocument();
    });

    it("llama a onChange cuando se selecciona una opción", () => {
        const handleChange = vi.fn();
        render(
            <Select
                id="test-select"
                name="testSelect"
                options={options}
                onChange={handleChange}
            />
        );
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "option2" },
        });
        expect(handleChange).toHaveBeenCalled();
    });

    it("muestra mensaje de error si errors está presente", () => {
        const errors = {
            testSelect: { message: "Campo requerido" },
        };
        render(
            <Select
                id="test-select"
                name="testSelect"
                options={options}
                errors={errors}
            />
        );
        expect(screen.getByText("Campo requerido")).toBeInTheDocument();
    });

    it("no muestra mensaje de error si errors es null", () => {
        render(
            <Select
                id="test-select"
                name="testSelect"
                options={options}
                errors={null}
            />
        );
        expect(screen.queryByText("Campo requerido")).not.toBeInTheDocument();
    });
});
