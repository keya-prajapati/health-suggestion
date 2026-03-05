import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const generateReply = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("fever")) return "🤒 Take rest and drink plenty of fluids.";
    if (text.includes("cold")) return "❄️ Drink warm water and take steam.";
    if (text.includes("headache")) return "💆‍♂️ Avoid stress and get proper sleep.";
    if (text.includes("stomach")) return "🥗 Eat light meals and stay hydrated.";
    return "⚠️ Please consult a doctor for proper advice.";
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    const userMessage = message;
    setMessage("");

    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botReply = generateReply(userMessage);
    setChatHistory((prev) => [...prev, { sender: "bot", text: botReply }]);
    setIsTyping(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    try {
      await axios.post("http://localhost:5000/api/chat", {
        userId: user?.id,
        message: userMessage,
        reply: botReply,
      });
    } catch (error) {
      console.log("Error saving chat:", error);
    }
  };

  return (
    <div 
      className="container mt-5 position-relative"
      style={{ background: "#e8f5e9", borderRadius: "15px", padding: "20px", minHeight: "100vh" }}
    >
      {/* 🔹 Small Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          width: "40px",
          height: "40px",
          background: "#2e7d32",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ⬅
      </button>

      <div
        className="shadow p-4 rounded"
        style={{ 
          maxWidth: "600px", 
          margin: "auto", 
          background: "#ffffff", 
          border: "1px solid #c8e6c9" 
        }}
      >
        <h3 className="text-center mb-4 text-success">💬 Smart AI Health Chatbot</h3>

        <div
          style={{
            height: "400px",
            overflowY: "auto",
            padding: "15px",
            borderRadius: "10px",
            background: "#f1f8e9",
          }}
        >
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-3">
              {chat.sender === "user" ? (
                <div className="d-flex justify-content-end mb-1">
                  <span
                    className="badge bg-primary p-2"
                    style={{ maxWidth: "70%", wordWrap: "break-word" }}
                  >
                    {chat.text}
                  </span>
                </div>
              ) : (
                <div className="d-flex justify-content-start mb-2">
                  <span
                    className="badge bg-success p-2"
                    style={{ maxWidth: "70%", wordWrap: "break-word" }}
                  >
                    {chat.text}
                  </span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="d-flex justify-content-start mb-2">
              <span
                className="badge bg-success p-2"
                style={{ maxWidth: "70%", wordWrap: "break-word", fontStyle: "italic" }}
              >
                Typing...
              </span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Type your symptoms..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-success rounded-end" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;