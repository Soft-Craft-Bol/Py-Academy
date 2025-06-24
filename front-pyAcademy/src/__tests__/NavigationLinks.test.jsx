import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavigationLinks from '../shared/ui/molecules/navbar/NavigationLinks';

vi.mock('../shared/ui/atoms/NavigationLink', () => ({
    NavigationLink: ({ text, to }) => <li data-testid="nav-link">{text} - {to}</li>,
}));

describe('NavigationLinks', () => {
    const options = [
        { title: 'Inicio', to: '/' },
        { title: 'Explorar Cursos', to: '/cursos' },
        { title: 'Recursos OER', to: '/recursos' },
    ];

    it('renderiza todos los NavigationLink con los textos y rutas correctas', () => {
        render(<NavigationLinks options={options} />);
        const navLinks = screen.getAllByTestId('nav-link');
        expect(navLinks).toHaveLength(options.length);
        expect(navLinks[0]).toHaveTextContent('Inicio - /');
        expect(navLinks[1]).toHaveTextContent('Explorar Cursos - /cursos');
        expect(navLinks[2]).toHaveTextContent('Recursos OER - /recursos');
    });
});
