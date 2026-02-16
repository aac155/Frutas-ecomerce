"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"chat" | "email">("chat");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simple auto-reply logic
        setTimeout(() => {
            let botText = "Entiendo. Un asesor te contactará pronto.";
            if (input.toLowerCase().includes("precio") || input.toLowerCase().includes("costo")) {
                botText = "Nuestros precios varían desde $80 hasta $110. Puedes verlos en la sección Tienda.";
            } else if (input.toLowerCase().includes("envío")) {
                botText = "Hacemos envíos a todo México. Gratis en compras mayores a $500.";
            } else if (input.toLowerCase().includes("hola")) {
                botText = "¡Hola! ¿Buscas algún producto en especial?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);

            // Ask for email after nice interaction
            if (messages.length > 2 && step === "chat") {
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now() + 2, text: "¿Me podrías dejar tu correo para enviarte un cupón de descuento?", sender: "bot" }]);
                    setStep("email");
                }, 1000);
            }
        }, 1000);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessages(prev => [...prev, { id: Date.now(), text: email, sender: "user" }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "¡Gracias! Te hemos enviado la información.", sender: "bot" }]);
            setEmail("");
            setStep("chat");
        }, 800);
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-40 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--color-secondary)] transition-transform hover:scale-110 ${isOpen ? "hidden" : "flex"}`}
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
                    {/* Header */}
                    <div className="bg-[var(--color-primary)] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-2">
                            <Bot className="w-5 h-5" />
                            <span className="font-bold">Asistente Virtual</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                                            ? "bg-[var(--color-primary)] text-white rounded-br-none"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        {step === "chat" ? (
                            <form onSubmit={handleSend} className="flex space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-grow input-flat border border-gray-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none rounded-none"
                                />
                                <button type="submit" className="bg-[var(--color-primary)] text-white p-2 hover:bg-[var(--color-secondary)] transition-colors">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleEmailSubmit} className="flex space-x-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@correo.com"
                                    className="flex-grow input-flat border border-gray-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                                    required
                                />
                                <button type="submit" className="bg-[var(--color-secondary)] text-white p-2 hover:opacity-90 transition-colors">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
