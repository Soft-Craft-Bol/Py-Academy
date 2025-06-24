import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../shared/ui/organisms/Footer';

vi.mock('../shared/ui/molecules/MenuInformation', () => ({
    MenuInformation: ({ information }) => (
        <div data-testid={`menu-info-${information.title}`}>{information.title}</div>
    ),
}));

vi.mock('../../../assets/img/logo-python.webp', () => 'logo-python.webp');

describe('Footer', () => {
    it('renderiza el logo, el nombre y el texto de la plataforma', () => {
        render(<Footer />);
        expect(screen.getByAltText('PyAcademy Logo')).toBeInTheDocument();
        expect(screen.getByText('PyAcademy')).toBeInTheDocument();
        expect(
            screen.getByText(
                /Transformando la educación en programación con IA y recursos abiertos/i
            )
        ).toBeInTheDocument();
    });

    it('renderiza los bloques de información de plataforma, soporte y legal', () => {
        render(<Footer />);
        expect(screen.getByTestId('menu-info-Plataforma')).toBeInTheDocument();
        expect(screen.getByTestId('menu-info-Soporte')).toBeInTheDocument();
        expect(screen.getByTestId('menu-info-Legal')).toBeInTheDocument();
    });

    it('renderiza el año actual y el texto de derechos reservados', () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(
            screen.getByText(`© ${year} PyAcademy. Todos los derechos reservados.`)
        ).toBeInTheDocument();
    });
});
