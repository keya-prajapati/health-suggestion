import { useNavigate } from "react-router-dom";
import "./MentalHealth.css"; // optional: for additional styling

function MentalHealth() {
  const navigate = useNavigate();

  const tips = [
    "🧘‍♀️ Practice meditation for 10 minutes daily",
    "💤 Ensure 7-8 hours of sleep",
    "📝 Keep a journal to manage stress",
    "🏃 Exercise regularly to boost mood",
    "🎵 Listen to calming music to relax"
  ];

  return (
    <div 
      className="container mt-5 position-relative" 
      style={{ background: "#e3f2fd", borderRadius: "15px", padding: "20px" }}
    >
      {/* 🔹 Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate("/")}
      >
        ⬅
      </button>

      <div className="mental-box p-4 shadow rounded mt-3" style={{ background: "#f1f8e9" }}>
        <h3 className="mb-3">🧠 Mental Health Tips</h3>
        <ul className="list-group">
          {tips.map((tip, index) => (
            <li key={index} className="list-group-item">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MentalHealth;