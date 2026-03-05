import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Achievements() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  // Fetch achievements from backend
  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/achievements/${user.id}`);
      setAchievements(res.data);
    } catch (err) {
      console.log("Error fetching achievements:", err);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className="container mt-5 position-relative">
      {/* 🔹 Floating Back Button */}
      <button
        className="small-back-btn"
        onClick={() => navigate("/")}
      >
        ⬅
      </button>

      <div className="achievement-box p-4 shadow rounded mt-3">
        <h3 className="mb-3">🏅 Achievements</h3>

        {achievements.length === 0 ? (
          <p>No achievements yet. Complete your health goals to unlock them! 🏃‍♂️💧🛌</p>
        ) : (
          <ul className="list-group">
            {achievements.map((ach) => (
              <li key={ach.id} className="list-group-item">
                {ach.date_achieved} — {ach.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Achievements;