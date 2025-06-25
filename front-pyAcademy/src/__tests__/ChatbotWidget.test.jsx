import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatbotWidget } from '../shared/ui/organisms/chatbot/ChatbotWidget';

vi.mock('react-icons/fa', () => ({
    FaComments: (props) => <svg data-testid="fa-comments" {...props} />,
}));

vi.mock('../shared/ui/organisms/chatbot/ChatWindow', () => ({
    ChatWindow: (props) => <div data-testid="chat-window">ChatWindow</div>,
}));

vi.mock('../shared/ui/organisms/chatbot/useChatbot', () => ({
    useChatbot: vi.fn(),
}));

const { useChatbot } = require('../shared/ui/organisms/chatbot/useChatbot');

describe('ChatbotWidget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza el botón del chatbot y el icono', () => {
        useChatbot.mockReturnValue({
            isOpen: false,
            toggleChat: vi.fn(),
            messages: [],
            sendMessage: vi.fn(),
            isLoading: false,
        });
        render(<ChatbotWidget />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId('fa-comments')).toBeInTheDocument();
        expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
    });

    it('muestra ChatWindow cuando isOpen es true', () => {
        useChatbot.mockReturnValue({
            isOpen: true,
            toggleChat: vi.fn(),
            messages: [{ text: 'Hola' }],
            sendMessage: vi.fn(),
            isLoading: false,
        });
        render(<ChatbotWidget />);
        expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    });

    it('llama a toggleChat al hacer click en el botón', () => {
        const toggleChat = vi.fn();
        useChatbot.mockReturnValue({
            isOpen: false,
            toggleChat,
            messages: [],
            sendMessage: vi.fn(),
            isLoading: false,
        });
        render(<ChatbotWidget />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(toggleChat).toHaveBeenCalled();
    });
});
