import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessageToChatbot } from "./chatbotApi";

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (text) => {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const userMessage = { id: uuidv4(), sender: "user", text, time };
        setMessages((prev) => [...prev, userMessage]);

        setIsLoading(true);
        try {
        const response = await sendMessageToChatbot(text);
        const botMessage = {
            id: uuidv4(),
            sender: "bot",
            text: response.reply || "Lo siento, no entendí eso.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
        console.error("Error al consultar la IA:", error);
        } finally {
        setIsLoading(false);
        }
    };

    return { isOpen, toggleChat, messages, sendMessage, isLoading };
};