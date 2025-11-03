"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false); // ✅ to track first open

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user's message immediately
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    const userInput = input;
    setInput("");

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/suggest-course/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await res.json();

      // Handle bot responses
      if (Array.isArray(data) && data.length > 0) {
        const courses = data.map((course) => `🎓 ${course.title}`).join("\n\n");

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Here are some course suggestions:\n\n${courses}`,
          },
        ]);
      } else if (data.message) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, something went wrong." },
        ]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Couldn't connect to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);

    // ✅ Show welcome message only once
    if (!hasGreeted) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hi, I’m Elanary Bot! How can I help you today?",
        },
      ]);
      setHasGreeted(true);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-[#00ECA3] text-white p-4 rounded-full shadow-lg hover:bg-[#00d091] transition-all duration-300 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 h-[35rem] right-6 w-[25rem] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#00ECA3] text-white px-4 py-3">
            <h3 className="font-semibold">Chat Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto whitespace-pre-wrap">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-[#00ECA3] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            {/* Loading message */}
            {loading && (
              <div className="flex justify-start">
                <p className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 animate-pulse">
                  Typing...
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center py-2 px-2 border-t border-gray-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-2 rounded-2xl transition-all flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send className="w-5 h-5 text-[#00ECA3] hover:text-black" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
