"use client";

import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};
import '../app/globals.css'
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hey 👋 I'm Mina's AI assistant. How can I help you?",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: data.reply || "Sorry, I couldn't answer that.",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="chat-window">

          {/* TOP GLOW */}
          <div className="chat-glow" />

          {/* HEADER */}
          <div className="chat-header">

            <div className="chat-header-info">

              <div className="chat-avatar">
                <span>M</span>
                <div className="avatar-glow" />
              </div>

              <div className="chat-title">
                <strong>Mina AI</strong>

                <span className="chat-status">
                  <i />
                  Online & ready to help
                </span>
              </div>

            </div>

            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <span />
              <span />
            </button>

          </div>


          {/* CHAT INTRO */}
          {messages.length === 1 && (
            <div className="chat-intro">

              <div className="intro-icon">
                ✦
              </div>

              <h3>How can I help?</h3>

              <p>
                Ask me about Mina's work, services,
                projects, or anything else.
              </p>

              <div className="quick-actions">

                <button
                  type="button"
                  onClick={() => setInput("Tell me about Mina's work")}
                >
                  <span>✦</span>
                  Mina's work
                </button>

                <button
                  type="button"
                  onClick={() => setInput("What services does Mina offer?")}
                >
                  <span>↗</span>
                  Services
                </button>

              </div>

            </div>
          )}


          {/* MESSAGES */}
          <div className="chat-messages">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message-row ${
                  message.sender === "user"
                    ? "user-row"
                    : "bot-row"
                }`}
              >

                {message.sender === "bot" && (
                  <div className="message-avatar">
                    M
                  </div>
                )}

                <div
                  className={`chat-message ${
                    message.sender === "user"
                      ? "user-message"
                      : "bot-message"
                  }`}
                >
                  {message.text}
                </div>

              </div>
            ))}

            {loading && (
              <div className="chat-message-row bot-row">

                <div className="message-avatar">
                  M
                </div>

                <div className="chat-message bot-message typing-message">
                  <span />
                  <span />
                  <span />
                </div>

              </div>
            )}

          </div>


          {/* INPUT */}
          <div className="chat-input-wrapper">

            <div className="chat-input">

              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 3L10 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 3L14 21L10 14L3 10L21 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </div>

            <div className="chat-powered">
              <span>✦</span>
              Powered by Mina AI
            </div>

          </div>

        </div>
      )}


      {/* FLOATING BUTTON */}
      <button
        type="button"
        className={`chat-button ${
          isOpen ? "chat-button-open" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >

        {!isOpen && (
          <>
            <div className="button-ring" />
            <div className="chat-spark">✦</div>
            <span className="chat-button-text">
              Ask AI
            </span>
          </>
        )}

        {isOpen && (
          <div className="close-icon">
            <span />
            <span />
          </div>
        )}

      </button>

    </div>
  );
}
