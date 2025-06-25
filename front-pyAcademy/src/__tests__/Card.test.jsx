import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../shared/ui/molecules/Card';

vi.mock('../shared/ui/atoms/Button', () => ({
    default: ({ children, ...props }) => <button data-testid="card-button" {...props}>{children}</button>,
}));

describe('Card', () => {
    const props = {
        title: 'Título de prueba',
        description: 'Descripción de la tarjeta',
        imageUrl: 'https://ejemplo.com/imagen.jpg',
        buttonText: 'Ver más',
        onButtonClick: vi.fn(),
    };

    it('renderiza el título, descripción, imagen y botón', () => {
        render(<Card {...props} />);
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.description)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', props.imageUrl);
        expect(screen.getByRole('img')).toHaveAttribute('alt', props.title);
        expect(screen.getByTestId('card-button')).toHaveTextContent(props.buttonText);
    });

    it('llama a onButtonClick al hacer click en el botón', () => {
        render(<Card {...props} />);
        const button = screen.getByTestId('card-button');
        fireEvent.click(button);
        expect(props.onButtonClick).toHaveBeenCalled();
    });
});
