import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import HealthTracking from "./pages/HealthTracking";
import DietSuggestions from "./pages/DietSuggestions";
import DailyTips from "./pages/DailyTips";
import MentalHealth from "./pages/MentalHealth";
import PreventiveCheckups from "./pages/PreventiveCheckups";
import Achievements from "./pages/Achievements";
import BookAppointment from "./pages/BookAppointment";
import Profile from "./pages/Profile";
import MyAppointments from "./pages/MyAppointments"; // ✅ NEW PAGE

// ✅ Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/chatbot"
          element={<ProtectedRoute><Chatbot /></ProtectedRoute>}
        />

        <Route
          path="/health-tracking"
          element={<ProtectedRoute><HealthTracking /></ProtectedRoute>}
        />

        <Route
          path="/diet-suggestions"
          element={<ProtectedRoute><DietSuggestions /></ProtectedRoute>}
        />

        <Route
          path="/daily-tips"
          element={<ProtectedRoute><DailyTips /></ProtectedRoute>}
        />

        <Route
          path="/mental-health"
          element={<ProtectedRoute><MentalHealth /></ProtectedRoute>}
        />

        <Route
          path="/preventive-checkups"
          element={<ProtectedRoute><PreventiveCheckups /></ProtectedRoute>}
        />

        <Route
          path="/achievements"
          element={<ProtectedRoute><Achievements /></ProtectedRoute>}
        />

        <Route
          path="/book-appointment"
          element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}
        />

        <Route
          path="/my-appointments"
          element={<ProtectedRoute><MyAppointments /></ProtectedRoute>}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

      </Routes>
    </Router>
  );
}

export default App;