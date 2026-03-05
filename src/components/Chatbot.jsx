import { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = () => {
    const msg = message.toLowerCase().trim();

    if (!msg) {
      setReply("Please enter your symptoms.");
      return;
    }

    if (msg.includes("fever")) {
      setReply("🤒 Take rest, drink plenty of fluids, and monitor your temperature.");
    } else if (msg.includes("cold")) {
      setReply("🤧 Drink warm water, take steam inhalation, and rest well.");
    } else if (msg.includes("headache")) {
      setReply("😌 Avoid stress, stay hydrated, and get proper sleep.");
    } else {
      setReply("⚠️ Please consult a doctor for proper advice.");
    }

    setMessage(""); // Clear input after sending
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">💚 Health Chatbot</h2>

      <input
        type="text"
        className="chatbot-input"
        placeholder="Type your symptoms..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button className="chatbot-btn" onClick={sendMessage}>
        Send
      </button>

      {reply && <div className="chatbot-reply">{reply}</div>}
    </div>
  );
}

export default Chatbot;
