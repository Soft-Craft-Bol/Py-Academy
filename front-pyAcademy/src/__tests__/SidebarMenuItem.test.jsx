import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SidebarMenuItem } from '../shared/ui/atoms/SidebarMenuItem';

const MockIcon = (props) => <svg data-testid="mock-icon" {...props} />;

describe('SidebarMenuItem', () => {
    const defaultProps = {
        title: 'Dashboard',
        to: '/dashboard',
        Icon: MockIcon,
        className: 'custom-class',
    };

    it('renderiza el enlace con el icono y el título visible si isSidebarOpen es true', () => {
        render(
            <MemoryRouter>
                <SidebarMenuItem {...defaultProps} isSidebarOpen={true} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/dashboard');
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeVisible();
        expect(link).toHaveClass('custom-class');
    });

    it('no muestra el título si isSidebarOpen es false', () => {
        render(
            <MemoryRouter>
                <SidebarMenuItem {...defaultProps} isSidebarOpen={false} />
            </MemoryRouter>
        );
        const span = screen.getByText('Dashboard');
        expect(span).toHaveClass('hidden');
    });
});
