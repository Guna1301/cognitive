import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = ({ onClose }) => {
  const REACT_APP_BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      text: "Welcome! You can ask me anything about autism and dyslexia.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const formatText = (text) => {
    if (!text) return [];

    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "•")
      .split("\n");
  };

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    const currentMessage = input.trim();

    const userMsg = {
      text: currentMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setLoading(true);

    try {
      const res = await fetch(`${REACT_APP_BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentMessage,
          email: localStorage.getItem("email"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Server Error");
      }

      const botMsg = {
        text: data.answer,
        sender: "bot",
        recommendations: data.recommendations || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error:", err.message);

      setInput(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          text: err.message || "Something went wrong",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col z-50">
      
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
        <span className="font-bold">AI Assistant</span>

        <button
          onClick={onClose}
          className="text-white font-bold text-lg"
        >
          ×
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx}>
            
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {formatText(msg.text).map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            {msg.recommendations &&
              msg.recommendations.length > 0 && (
                <>
                  <div className="text-xs text-gray-500 mt-1">
                    Suggested activities:
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.recommendations.map((rec, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(rec.route)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition"
                      >
                        {rec.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            Typing...
          </div>
        )}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask something..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <button
          onClick={sendMessage}
          disabled={loading || input.trim() === ""}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;