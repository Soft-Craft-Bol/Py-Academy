import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuInformation } from '../shared/ui/molecules/MenuInformation';

describe('MenuInformation', () => {
    const information = {
        title: 'Recursos',
        items: [
            { content: 'Documentación', url: 'https://docs.com' },
            { content: 'Soporte', url: 'https://soporte.com' },
        ],
    };

    it('renderiza el título y los enlaces correctamente', () => {
        render(<MenuInformation information={information} />);
        expect(screen.getByText('Recursos')).toBeInTheDocument();
        expect(screen.getByText('Documentación')).toBeInTheDocument();
        expect(screen.getByText('Soporte')).toBeInTheDocument();
        expect(screen.getByText('Documentación').closest('a')).toHaveAttribute('href', 'https://docs.com');
        expect(screen.getByText('Soporte').closest('a')).toHaveAttribute('href', 'https://soporte.com');
    });
});
