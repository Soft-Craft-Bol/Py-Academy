import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SidebarMenu } from '../shared/ui/molecules/sidebar/SidebarMenu';

vi.mock('../shared/ui/atoms/SidebarMenuItem', () => ({
    SidebarMenuItem: ({ title, to, Icon, isSidebarOpen }) => (
        <div data-testid="sidebar-menu-item">
            <span>{title}</span>
            <span>{to}</span>
            <span>{isSidebarOpen ? 'abierto' : 'cerrado'}</span>
            <Icon data-testid={`icon-${title}`} />
        </div>
    ),
}));

describe('SidebarMenu', () => {
    const options = [
        { title: 'Inicio', to: '/', Icon: (props) => <svg data-testid="icon-inicio" {...props} /> },
        { title: 'Perfil', to: '/perfil', Icon: (props) => <svg data-testid="icon-perfil" {...props} /> },
    ];

    it('renderiza todos los SidebarMenuItem con los props correctos y el estado abierto', () => {
        render(<SidebarMenu options={options} isSidebarOpen={true} />);
        const items = screen.getAllByTestId('sidebar-menu-item');
        expect(items).toHaveLength(options.length);
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Perfil')).toBeInTheDocument();
        expect(screen.getAllByText('abierto')).toHaveLength(options.length);
        expect(screen.getByTestId('icon-inicio')).toBeInTheDocument();
        expect(screen.getByTestId('icon-perfil')).toBeInTheDocument();
    });

    it('renderiza el estado cerrado cuando isSidebarOpen es false', () => {
        render(<SidebarMenu options={options} isSidebarOpen={false} />);
        expect(screen.getAllByText('cerrado')).toHaveLength(options.length);
    });
});
