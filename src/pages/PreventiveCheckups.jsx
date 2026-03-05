import { useNavigate } from "react-router-dom";
import "./PreventiveCheckups.css"; // optional for extra styling

function PreventiveCheckups() {
  const navigate = useNavigate();

  const checkups = [
    "🩺 Blood Pressure: Every 2 years",
    "🩸 Blood Sugar: Every year after 40",
    "🦴 Bone Density: Women after 50",
    "👀 Eye Exam: Every 2 years",
    "🦷 Dental Checkup: Every 6 months"
  ];

  return (
    <div 
      className="container mt-5 position-relative" 
      style={{ background: "#fff3e0", borderRadius: "15px", padding: "20px" }}
    >
      {/* 🔹 Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate("/")}
      >
        ⬅
      </button>

      <div className="checkup-box p-4 shadow rounded mt-3" style={{ background: "#fffde7" }}>
        <h3 className="mb-3">🏥 Preventive Health Checkups</h3>
        <ul className="list-group">
          {checkups.map((item, index) => (
            <li key={index} className="list-group-item">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PreventiveCheckups;