import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarUser } from '../shared/ui/organisms/NavbarUser';

vi.mock('../shared/ui/molecules/navbar/MobileMenu', () => ({
    MobileMenu: () => <div data-testid="mobile-menu">MobileMenu</div>,
}));

vi.mock('../shared/ui/atoms/LogoNavbar', () => ({
    LogoNavbar: ({ logo, title }) => <div data-testid="logo-navbar">{title}</div>,
}));

vi.mock('../shared/ui/atoms/ButtonTheme', () => ({
    ButtonTheme: ({ theme, onChangeTheme }) => (
        <button data-testid="button-theme" onClick={onChangeTheme}>{theme}</button>
    ),
}));

vi.mock('react-icons/fa', () => ({
    FaUserCircle: (props) => <svg data-testid="fa-user-circle" {...props} />,
}));

vi.mock('../../../assets/img/logo-python.webp', () => 'logo-python.webp');

describe('NavbarUser', () => {
    beforeEach(() => {
        // Mock window.matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: query.includes('dark'),
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
        // Limpia la clase dark del html
        document.querySelector('html').classList.remove('dark');
    });

    it('renderiza el logo, el botón de tema y el icono de usuario', () => {
        render(<NavbarUser />);
        expect(screen.getByTestId('logo-navbar')).toHaveTextContent('PyAcademy');
        expect(screen.getByTestId('button-theme')).toBeInTheDocument();
        expect(screen.getByTestId('fa-user-circle')).toBeInTheDocument();
    });

    it('cambia el tema al hacer click en el botón de tema', () => {
        render(<NavbarUser />);
        const button = screen.getByTestId('button-theme');
        expect(button).toHaveTextContent('dark');
        fireEvent.click(button);
        expect(button).toHaveTextContent('light');
        fireEvent.click(button);
        expect(button).toHaveTextContent('dark');
    });

    it('no renderiza MobileMenu por defecto', () => {
        render(<NavbarUser />);
        expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
});
