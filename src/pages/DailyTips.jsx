import { useNavigate } from "react-router-dom";
import "./DailyTips.css";

function DailyTips() {
  const navigate = useNavigate();

  const tips = [
    "Drink at least 8 glasses of water 💧",
    "Take a 10-minute walk daily 🚶‍♂️",
    "Eat more fruits and vegetables 🥦🍎",
    "Get at least 7-8 hours of sleep 😴",
    "Practice meditation or mindfulness 🧘‍♀️",
    "Avoid excessive sugar and junk food 🍫❌",
    "Take short breaks from screen time 💻",
  ];

  return (
    <div className="container mt-5 position-relative">
      {/* 🔹 Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate("/")}
      >
        ⬅
      </button>

      <div className="daily-box mt-3">
        <h3>🌞 Daily Wellness Tips</h3>

        <ul>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DailyTips;