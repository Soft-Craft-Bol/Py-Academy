import { useEffect, useRef, useState } from 'react';

export function ChatWindow({ messages, onSend, isLoading }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 w-[90vw] sm:w-80 max-w-sm max-h-[70vh] bg-white dark:bg-zinc-800 shadow-2xl rounded-xl border border-gray-300 dark:border-zinc-700 flex flex-col overflow-hidden z-50">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 font-semibold">
        Tutor IA
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-2xl max-w-[80%] whitespace-pre-line
                ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-zinc-700 dark:text-white'
                }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
          </div>
        ))}
        {isLoading && <p className="text-gray-400">Escribiendo...</p>}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-2 border-t dark:border-zinc-700 bg-white dark:bg-zinc-800"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border dark:border-zinc-600 bg-gray-50 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu pregunta..."
        />
      </form>
    </div>
  );
}
