import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HealthTracking.css";

function HealthTracking() {
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const saveData = async () => {
    if (!steps && !water && !sleep) return;

    try {
      const res = await axios.post("http://localhost:5000/api/health/add", {
        userId: user.id,
        steps: steps || 0,
        water: water || 0,
        sleep: sleep || 0,
      });

      let msg = `✅ Data Saved! \nSteps: ${steps || 0}, Water: ${water || 0} glasses, Sleep: ${sleep || 0} hrs`;

      if (res.data.achievements.length) {
        res.data.achievements.forEach(a => {
          msg += `\n🏆 Achievement Unlocked: ${a.description}`;
        });
      }

      setMessage(msg);
      setSteps("");
      setWater("");
      setSleep("");
    } catch (err) {
      console.log("Error saving health data:", err);
      setMessage("⚠️ Error saving data. Try again!");
    }
  };

  return (
    <div 
      className="container mt-5 position-relative"
      style={{ background: "#e8f5e9", minHeight: "100vh", padding: "20px", borderRadius: "15px" }}
    >
      {/* 🔹 Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate("/")}
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
        className="health-box mt-3 shadow p-4 rounded"
        style={{ 
          maxWidth: "600px", 
          margin: "auto", 
          background: "#ffffff", 
          border: "1px solid #c8e6c9"
        }}
      >
        <h3>📊 Health Tracking</h3>

        <input
          type="number"
          placeholder="Steps walked today"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          style={{ marginBottom: "15px" }}
        />

        <input
          type="number"
          placeholder="Glasses of water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          style={{ marginBottom: "15px" }}
        />

        <input
          type="number"
          placeholder="Hours of sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          style={{ marginBottom: "15px" }}
        />

        <button 
          onClick={saveData} 
          className="btn btn-success"
          style={{ width: "100%" }}
        >
          Save
        </button>

        {message && (
          <div
            className="alert-success"
            style={{ whiteSpace: "pre-line", marginTop: "15px", background: "#c8e6c9", color: "#256029", padding: "12px", borderRadius: "10px" }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthTracking;