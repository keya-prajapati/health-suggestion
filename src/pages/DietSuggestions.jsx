import { useState } from "react";
import { Link } from "react-router-dom";
import "./DietSuggestions.css"; // Separate CSS for clarity

function DietSuggestions() {
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [message, setMessage] = useState("");

  const getDietPlan = () => {
    if (!age) {
      setMessage("⚠️ Please enter your age.");
      return;
    }

    let suggestion = "";

    if (goal === "lose") {
      suggestion = "🥗 Eat more vegetables, reduce sugar & carbs.";
    } else if (goal === "gain") {
      suggestion = "🍗 Include protein-rich foods, nuts & healthy fats.";
    } else {
      suggestion = "🥑 Balanced diet with fruits, vegetables, and protein.";
    }

    setMessage(`✅ Diet Suggestion for age ${age}: ${suggestion}`);
  };

  return (
    <div className="diet-page">
      <Link to="/" className="back-btn">⬅️ Back to Home</Link>

      <div className="diet-card">
        <h3 className="diet-title">🥗 Diet Suggestions</h3>

        <input
          type="number"
          className="diet-input"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className="diet-select"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="maintain">Maintain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>

        <button className="diet-btn" onClick={getDietPlan}>Get Suggestion</button>

        {message && <div className="diet-message">{message}</div>}
      </div>
    </div>
  );
}

export default DietSuggestions;
    