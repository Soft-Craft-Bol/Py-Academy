import { FaComments } from 'react-icons/fa';

import { ChatWindow } from './ChatWindow';
import { useChatbot } from './useChatbot';

export function ChatbotWidget() {
  const { isOpen, toggleChat, messages, sendMessage, isLoading } = useChatbot();

  return (
    <>
      {isOpen && <ChatWindow messages={messages} onSend={sendMessage} isLoading={isLoading} />}

      <button
        onClick={toggleChat}
        className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaComments size={20} />
      </button>
    </>
  );
}
