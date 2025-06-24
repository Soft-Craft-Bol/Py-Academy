import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarFooter } from '../shared/ui/molecules/sidebar/SidebarFooter';

vi.mock('react-icons/fi', () => ({
    FiChevronsLeft: (props) => <svg data-testid="chevrons-left" {...props} />,
    FiChevronsRight: (props) => <svg data-testid="chevrons-right" {...props} />,
    FiLogOut: (props) => <svg data-testid="fi-logout" {...props} />,
}));

describe('SidebarFooter', () => {
    it('renderiza el icono FiChevronsLeft y el texto cuando isSidebarOpen es true', () => {
        render(
            <SidebarFooter isSidebarOpen={true} onToggleSidebar={vi.fn()} onLogout={vi.fn()} />
        );
        expect(screen.getByTestId('chevrons-left')).toBeInTheDocument();
        expect(screen.getByText('Cerrar menu')).toBeVisible();
        expect(screen.getByTestId('fi-logout')).toBeInTheDocument();
        expect(screen.getByText('Cerrar sesión')).toBeVisible();
    });

    it('renderiza el icono FiChevronsRight y oculta los textos cuando isSidebarOpen es false', () => {
        render(
            <SidebarFooter isSidebarOpen={false} onToggleSidebar={vi.fn()} onLogout={vi.fn()} />
        );
        expect(screen.getByTestId('chevrons-right')).toBeInTheDocument();
        expect(screen.getByText('Cerrar menu')).toHaveClass('hidden');
        expect(screen.getByText('Cerrar sesión')).toHaveClass('hidden');
    });

    it('llama a onToggleSidebar al hacer click en el botón de menú', () => {
        const onToggleSidebar = vi.fn();
        render(
            <SidebarFooter isSidebarOpen={true} onToggleSidebar={onToggleSidebar} onLogout={vi.fn()} />
        );
        const menuButton = screen.getByText('Cerrar menu').closest('button');
        fireEvent.click(menuButton);
        expect(onToggleSidebar).toHaveBeenCalled();
    });

    it('llama a onLogout al hacer click en el botón de cerrar sesión', () => {
        const onLogout = vi.fn();
        render(
            <SidebarFooter isSidebarOpen={true} onToggleSidebar={vi.fn()} onLogout={onLogout} />
        );
        const logoutButton = screen.getByText('Cerrar sesión').closest('button');
        fireEvent.click(logoutButton);
        expect(onLogout).toHaveBeenCalled();
    });
});
