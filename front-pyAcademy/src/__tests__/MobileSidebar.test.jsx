import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileSidebar } from '../shared/ui/molecules/sidebar/MobileSidebar';

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
}));

vi.mock('react-icons/fi', () => ({
    FiLogOut: (props) => <svg data-testid="fi-logout" {...props} />,
}));

describe('MobileSidebar', () => {
    const options = [
        { title: 'Inicio', to: '/', Icon: (props) => <svg data-testid="icon-inicio" {...props} /> },
        { title: 'Perfil', to: '/perfil', Icon: (props) => <svg data-testid="icon-perfil" {...props} /> },
    ];

    it('renderiza el sidebar y las opciones cuando isMenuOpen es true', () => {
        render(
            <MobileSidebar
                isMenuOpen={true}
                options={options}
                onToggleMenu={vi.fn()}
                onLogout={vi.fn()}
            />
        );
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Perfil')).toBeInTheDocument();
        expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
        expect(screen.getByTestId('icon-inicio')).toBeInTheDocument();
        expect(screen.getByTestId('icon-perfil')).toBeInTheDocument();
        expect(screen.getByTestId('fi-logout')).toBeInTheDocument();
    });

    it('no renderiza el sidebar si isMenuOpen es false', () => {
        render(
            <MobileSidebar
                isMenuOpen={false}
                options={options}
                onToggleMenu={vi.fn()}
                onLogout={vi.fn()}
            />
        );
        expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
        expect(screen.queryByText('Perfil')).not.toBeInTheDocument();
        expect(screen.queryByText('Cerrar sesión')).not.toBeInTheDocument();
    });

    it('llama a onToggleMenu al hacer click en el fondo oscuro', () => {
        const onToggleMenu = vi.fn();
        render(
            <MobileSidebar
                isMenuOpen={true}
                options={options}
                onToggleMenu={onToggleMenu}
                onLogout={vi.fn()}
            />
        );
        const overlay = screen.getByRole('presentation', { hidden: true }) || document.querySelector('.bg-black');
        fireEvent.click(overlay);
        expect(onToggleMenu).toHaveBeenCalled();
    });

    it('llama a onLogout y onToggleMenu al hacer click en "Cerrar sesión"', () => {
        const onToggleMenu = vi.fn();
        const onLogout = vi.fn();
        render(
            <MobileSidebar
                isMenuOpen={true}
                options={options}
                onToggleMenu={onToggleMenu}
                onLogout={onLogout}
            />
        );
        const logoutButton = screen.getByText('Cerrar sesión');
        fireEvent.click(logoutButton.closest('button'));
        expect(onLogout).toHaveBeenCalled();
        expect(onToggleMenu).toHaveBeenCalled();
    });
});
