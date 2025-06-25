import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarPublic } from '../shared/ui/organisms/NavbarPublic';

vi.mock('../shared/ui/molecules/navbar/NavigationLinks', () => ({
    default: ({ options }) => (
        <nav data-testid="navigation-links">
            {options.map((opt) => (
                <span key={opt.title}>{opt.title}</span>
            ))}
        </nav>
    ),
}));

vi.mock('../shared/ui/atoms/LogoNavbar', () => ({
    LogoNavbar: ({ logo, title }) => <div data-testid="logo-navbar">{title}</div>,
}));

vi.mock('../shared/ui/atoms/ButtonTheme', () => ({
    ButtonTheme: ({ theme, onChangeTheme }) => (
        <button data-testid="button-theme" onClick={onChangeTheme}>{theme}</button>
    ),
}));

vi.mock('../shared/ui/atoms/ButtonBurguer', () => ({
    ButtonBurguer: ({ onClick, isMenuOpen }) => (
        <button data-testid="button-burguer" onClick={onClick}>{isMenuOpen ? 'Cerrar' : 'Abrir'}</button>
    ),
}));

vi.mock('../shared/ui/molecules/navbar/MobileMenu', () => ({
    MobileMenu: () => <div data-testid="mobile-menu">MobileMenu</div>,
}));

vi.mock('../shared/ui/atoms/Button', () => ({
    default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock('../../../assets/img/logo-python.webp', () => 'logo-python.webp');

describe('NavbarPublic', () => {
    beforeEach(() => {
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
        document.querySelector('html').classList.remove('dark');
    });

    it('renderiza el logo, NavigationLinks y los botones principales', () => {
        render(<NavbarPublic />);
        expect(screen.getByTestId('logo-navbar')).toHaveTextContent('PyAcademy');
        expect(screen.getByTestId('navigation-links')).toBeInTheDocument();
        expect(screen.getByTestId('button-theme')).toBeInTheDocument();
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
        expect(screen.getByText('Registrarse')).toBeInTheDocument();
        expect(screen.getByTestId('button-burguer')).toBeInTheDocument();
    });

    it('cambia el tema al hacer click en el botón de tema', () => {
        render(<NavbarPublic />);
        const button = screen.getByTestId('button-theme');
        expect(button).toHaveTextContent('dark');
        fireEvent.click(button);
        expect(button).toHaveTextContent('light');
        fireEvent.click(button);
        expect(button).toHaveTextContent('dark');
    });

    it('muestra MobileMenu al hacer click en el botón hamburguesa', () => {
        render(<NavbarPublic />);
        const burguer = screen.getByTestId('button-burguer');
        fireEvent.click(burguer);
        expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });
});
