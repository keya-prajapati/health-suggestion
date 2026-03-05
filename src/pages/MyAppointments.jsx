import { useState, useEffect } from "react";
import axios from "axios";

function MyAppointments() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/appointments/${user.id}`
      );

      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setMessage("⚠️ Error loading appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel appointment
  const cancelAppointment = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/cancel/${id}`
      );

      // Reload without refreshing page
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "Cancelled" } : app
        )
      );

      setMessage("✅ Appointment cancelled successfully!");
    } catch (error) {
      console.error("Cancel error:", error);
      setMessage("⚠️ Failed to cancel appointment");
    }
  };

  if (!user) {
    return <h3>Please login first.</h3>;
  }

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((app) => (
          <div key={app.id} className="appointment-card">
            <h4>{app.name} ({app.specialty})</h4>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Time:</strong> {app.time}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    app.status === "Booked"
                      ? "green"
                      : "red",
                }}
              >
                {app.status}
              </span>
            </p>

            {app.status === "Booked" && (
              <button
                className="cancel-btn"
                onClick={() => cancelAppointment(app.id)}
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;