import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FeatureGrid from '../shared/ui/organisms/FeatureGrid';

vi.mock('../shared/ui/molecules/Card', () => ({
    default: ({ title, description, imageUrl, buttonText, onButtonClick }) => (
        <div data-testid="feature-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <span>{imageUrl}</span>
            <button onClick={onButtonClick}>{buttonText}</button>
        </div>
    ),
}));

describe('FeatureGrid', () => {
    const features = [
        {
            title: 'Función 1',
            description: 'Descripción 1',
            imageUrl: 'img1.jpg',
            buttonText: 'Ver más',
            onButtonClick: vi.fn(),
        },
        {
            title: 'Función 2',
            description: 'Descripción 2',
            imageUrl: 'img2.jpg',
            buttonText: 'Descubrir',
            onButtonClick: vi.fn(),
        },
    ];
    const title = 'Título de la sección';
    const subtitle = 'Subtítulo de la sección';

    it('renderiza el título, subtítulo y todas las tarjetas', () => {
        render(<FeatureGrid features={features} title={title} subtitle={subtitle} />);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getAllByTestId('feature-card')).toHaveLength(features.length);
        expect(screen.getByText('Función 1')).toBeInTheDocument();
        expect(screen.getByText('Función 2')).toBeInTheDocument();
    });

    it('llama a onButtonClick de la tarjeta correspondiente', () => {
        render(<FeatureGrid features={features} title={title} subtitle={subtitle} />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);
        expect(features[0].onButtonClick).toHaveBeenCalled();
        fireEvent.click(buttons[1]);
        expect(features[1].onButtonClick).toHaveBeenCalled();
    });
});
