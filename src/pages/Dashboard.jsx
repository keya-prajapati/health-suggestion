import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const doctors = [
  {
    name: "Dr. A. Sharma",
    specialty: "Cardiology",
    experience: "15 yrs",
    qualification: "MD, DM",
    fee: "₹1200",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. S. Patel",
    specialty: "Gynecology",
    experience: "12 yrs",
    qualification: "MBBS, MS",
    fee: "₹1000",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. R. Mehta",
    specialty: "Pediatrician",
    experience: "10 yrs",
    qualification: "MBBS, MD",
    fee: "₹900",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBellClick = async () => {
    setShowDropdown(!showDropdown);

    if (!showDropdown) {
      try {
        await axios.put(
          `http://localhost:5000/api/notifications/read/${userId}`
        );
        fetchNotifications();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const unreadCount = notifications.filter(
    (n) => n.is_read === false
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <h2 className="logo">Health Suggestion 💚</h2>
        <ul className="nav-icons">
          <li>
            <Link to="/profile">👤</Link>
          </li>

          {/* 🔔 NOTIFICATION */}
          <li style={{ position: "relative" }}>
            <button
              onClick={handleBellClick}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              🔔
            </button>

            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "4px 7px",
                  fontSize: "12px",
                }}
              >
                {unreadCount}
              </span>
            )}

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "30px",
                  width: "260px",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 1000,
                }}
              >
                {notifications.length === 0 ? (
                  <p style={{ padding: "10px" }}>No Notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
  key={n.id}
  style={{
    padding: "10px",
    borderBottom: "1px solid #eee",
    background: n.is_read ? "#fff" : "#f0f8ff",
    color: "black",
    fontWeight: n.is_read ? "normal" : "600"
  }}
>
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </li>

          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "#e53935",
                color: "white",
                border: "none",
                padding: "5px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="dashboard-hero">
        <h1>Welcome to Your Health Dashboard</h1>
        <p>Track your health, get tips, and chat with AI anytime!</p>
      </section>

      {/* CARDS GRID */}
      <section className="dashboard-cards">
        <Link to="/chatbot" className="dashboard-card">
          <span className="card-emoji">💬</span>
          <h4>AI Chatbot</h4>
          <p>Ask health-related questions anytime.</p>
        </Link>

        <Link to="/health-tracking" className="dashboard-card">
          <span className="card-emoji">📊</span>
          <h4>Health Tracking</h4>
          <p>Track daily habits like steps, water, and sleep.</p>
        </Link>

        <Link to="/diet-suggestions" className="dashboard-card">
          <span className="card-emoji">🥗</span>
          <h4>Diet Suggestions</h4>
          <p>Personalized nutrition and food guidance.</p>
        </Link>

        <Link to="/daily-tips" className="dashboard-card">
          <span className="card-emoji">🌞</span>
          <h4>Daily Wellness Tips</h4>
          <p>Receive daily tips for hydration, exercise, and sleep.</p>
        </Link>

        <Link to="/mental-health" className="dashboard-card">
          <span className="card-emoji">🧠</span>
          <h4>Mental Health</h4>
          <p>Stress management and mindfulness.</p>
        </Link>

        <Link to="/preventive-checkups" className="dashboard-card">
          <span className="card-emoji">🏥</span>
          <h4>Preventive Checkups</h4>
          <p>Get reminders for screenings.</p>
        </Link>

        <Link to="/achievements" className="dashboard-card">
          <span className="card-emoji">🏅</span>
          <h4>Achievements</h4>
          <p>Earn badges for healthy habits.</p>
        </Link>
      </section>

      {/* DOCTORS SECTION */}
      <section className="doctors-section">
        <h3>🩺 Our Specialists</h3>
        <div className="doctors-grid">
          {doctors.map((doc, index) => (
            <div key={index} className="doctor-card">
              <img src={doc.photo} alt={doc.name} />
              <h4>{doc.name}</h4>
              <p><strong>Specialty:</strong> {doc.specialty}</p>
              <p><strong>Experience:</strong> {doc.experience}</p>
              <p><strong>Qualification:</strong> {doc.qualification}</p>
              <p><strong>Consultation Fee:</strong> {doc.fee}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/book-appointment" className="btn-appointment">
            📅 Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;