import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWindow } from '../shared/ui/organisms/chatbot/ChatWindow';

describe('ChatWindow', () => {
    const baseMessages = [
        { id: 1, text: 'Hola', sender: 'user', time: '10:00' },
        { id: 2, text: '¡Hola! ¿En qué puedo ayudarte?', sender: 'bot', time: '10:01' },
    ];

    it('renderiza los mensajes y el título', () => {
        render(
            <ChatWindow messages={baseMessages} onSend={vi.fn()} isLoading={false} />
        );
        expect(screen.getByText('Tutor IA')).toBeInTheDocument();
        expect(screen.getByText('Hola')).toBeInTheDocument();
        expect(screen.getByText('¡Hola! ¿En qué puedo ayudarte?')).toBeInTheDocument();
        expect(screen.getByText('10:00')).toBeInTheDocument();
        expect(screen.getByText('10:01')).toBeInTheDocument();
    });

    it('muestra el indicador de "Escribiendo..." si isLoading es true', () => {
        render(
            <ChatWindow messages={baseMessages} onSend={vi.fn()} isLoading={true} />
        );
        expect(screen.getByText('Escribiendo...')).toBeInTheDocument();
    });

    it('envía el mensaje al hacer submit y limpia el input', () => {
        const onSend = vi.fn();
        render(
            <ChatWindow messages={baseMessages} onSend={onSend} isLoading={false} />
        );
        const input = screen.getByPlaceholderText('Escribe tu pregunta...');
        fireEvent.change(input, { target: { value: '¿Cuál es tu nombre?' } });
        fireEvent.submit(input.closest('form'));
        expect(onSend).toHaveBeenCalledWith('¿Cuál es tu nombre?');
        expect(input).toHaveValue('');
    });

    it('no envía mensaje si el input está vacío o solo espacios', () => {
        const onSend = vi.fn();
        render(
            <ChatWindow messages={baseMessages} onSend={onSend} isLoading={false} />
        );
        const input = screen.getByPlaceholderText('Escribe tu pregunta...');
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.submit(input.closest('form'));
        expect(onSend).not.toHaveBeenCalled();
    });
});
