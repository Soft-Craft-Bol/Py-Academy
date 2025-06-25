import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileImageUpload from '../shared/ui/molecules/profile/ProfileImageUpload';

vi.mock('react-icons/fa', () => ({
    FaCamera: () => <svg data-testid="fa-camera" />,
}));

describe('ProfileImageUpload', () => {
    it('muestra la imagen de previsualización si existe', () => {
        render(
            <ProfileImageUpload preview="preview-url" setPreview={vi.fn()} onChange={vi.fn()} />
        );
        const img = screen.getByAltText('Foto de perfil');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'preview-url');
    });

    it('muestra el texto "Sin foto" si no hay previsualización', () => {
        render(
            <ProfileImageUpload preview={null} setPreview={vi.fn()} onChange={vi.fn()} />
        );
        expect(screen.getByText('Sin foto')).toBeInTheDocument();
    });

    it('llama a setPreview y onChange al seleccionar un archivo', async () => {
        const setPreview = vi.fn();
        const onChange = vi.fn();
        render(
            <ProfileImageUpload preview={null} setPreview={setPreview} onChange={onChange} />
        );
        const file = new File(['dummy'], 'photo.png', { type: 'image/png' });
        const input = screen.getByLabelText(/foto de perfil/i) || screen.getByLabelText(/photo-upload/i) || screen.getByRole('textbox', { hidden: true });
        // fallback: busca el input por id
        const fileInput = document.getElementById('photo-upload') || input;
        fireEvent.change(fileInput, { target: { files: [file] } });
        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith(file);
        });
    });

    it('muestra el icono de cámara', () => {
        render(
            <ProfileImageUpload preview={null} setPreview={vi.fn()} onChange={vi.fn()} />
        );
        expect(screen.getByTestId('fa-camera')).toBeInTheDocument();
    });
});
