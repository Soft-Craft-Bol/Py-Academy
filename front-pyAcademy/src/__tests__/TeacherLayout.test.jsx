import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TeacherLayout } from '../shared/layouts/TeacherLayout';

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div data-testid="mock-outlet">Contenido del Outlet</div>,
    };
});

describe('TeacherLayout', () => {
    it('renderiza el layout y el Outlet', () => {
        render(
            <MemoryRouter>
                <TeacherLayout />
            </MemoryRouter>
        );
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass('min-h-screen');
        expect(screen.getByTestId('mock-outlet')).toHaveTextContent('Contenido del Outlet');
    });
});
