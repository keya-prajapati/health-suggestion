import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ Correct API URL
     const response = await axios.post(
  "http://localhost:5000/api/login",
  {
    email,
    password,
  }
);
      // ✅ Save token + user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("✅ Login Successful!");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message || "❌ Login failed. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>Health Suggestion</h1>
        <p>Your Smart AI Health Assistant 💚</p>
        <img
          src="https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-1395.jpg"
          alt="health"
          className="auth-image"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-box">
          <h3>Welcome Back 👋</h3>

          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;