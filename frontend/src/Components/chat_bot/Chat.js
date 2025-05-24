import React, { useState } from "react";

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Welcome! You can ask me anything about autism and dyslexia, I'll do my best to help.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Server Error");
      }

      const botMsg = { text: data.answer, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error:", err.message);
      setMessages((prev) => [
        ...prev,
        { text: err.message, sender: "bot" },
      ]);
    }

    setInput("");
  };


  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col z-50">
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
        <span className="font-bold">Query Bot</span>
        <button onClick={onClose} className="text-white font-bold">×</button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type..."
          className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
            Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
