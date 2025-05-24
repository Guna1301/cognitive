import React, { useState } from "react";
import Chat from "./Chat";
import "./GradioButton.css";

const GradioButton = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
  };

  return (
    <>
      {isChatbotVisible && <Chat onClose={toggleChatbot} />}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>
      </div>
    </>
  );
};

export default GradioButton;
