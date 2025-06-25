import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileMenu } from '../shared/ui/molecules/navbar/MobileMenu';

vi.mock('../shared/ui/atoms/NavigationLink', () => ({
    NavigationLink: ({ text }) => <li data-testid="nav-link">{text}</li>,
}));

vi.mock('../shared/ui/atoms/Button', () => ({
    default: ({ children, ...props }) => <button data-testid="button" {...props}>{children}</button>,
}));

describe('MobileMenu', () => {
    it('renderiza los enlaces de navegación y los botones', () => {
        render(<MobileMenu />);
        const navLinks = screen.getAllByTestId('nav-link');
        expect(navLinks).toHaveLength(4);
        expect(navLinks[0]).toHaveTextContent('Inicio');
        expect(navLinks[1]).toHaveTextContent('Explorar Cursos');
        expect(navLinks[2]).toHaveTextContent('Recursos OER');
        expect(navLinks[3]).toHaveTextContent('IA Tutor');

        const buttons = screen.getAllByTestId('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveTextContent('Iniciar sesión');
        expect(buttons[1]).toHaveTextContent('Registrarse');
    });
});
