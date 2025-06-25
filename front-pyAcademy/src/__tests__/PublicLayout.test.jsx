import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PublicLayout } from '../shared/layouts/PublicLayout';

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div data-testid="mock-outlet">Contenido del Outlet</div>,
    };
});

jest.mock('../shared/ui/organisms/NavbarPublic', () => ({
    NavbarPublic: () => <nav data-testid="navbar-public">Navbar</nav>,
}));

jest.mock('../shared/ui/organisms/Footer', () => ({
    Footer: () => <footer data-testid="footer-public">Footer</footer>,
}));

describe('PublicLayout', () => {
    it('renderiza NavbarPublic, Outlet y Footer', () => {
        render(
            <MemoryRouter>
                <PublicLayout />
            </MemoryRouter>
        );
        expect(screen.getByTestId('navbar-public')).toBeInTheDocument();
        expect(screen.getByRole('main')).toHaveClass('min-h-screen');
        expect(screen.getByTestId('mock-outlet')).toHaveTextContent('Contenido del Outlet');
        expect(screen.getByTestId('footer-public')).toBeInTheDocument();
    });
});
