import { useState, useEffect } from "react";
import axios from "axios";
import "./BookAppointment.css";

function BookAppointment() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Doctors
  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.log("Doctor fetch error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("⚠️ Please login first!");
      return;
    }

    if (!doctorId || !date || !time) {
      setMessage("⚠️ Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments/add",
        { userId: user.id, doctorId, date, time, symptoms }
      );

      if (res.data.success) {
        setMessage("✅ Appointment Booked Successfully!");
        setDoctorId("");
        setDate("");
        setTime("");
        setSymptoms("");
      } else {
        setMessage("⚠️ " + res.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <h3>Please login first.</h3>;
  }

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.name} - {doc.specialty}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <textarea
          placeholder="Symptoms (optional)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>

      </form>
    </div>
  );
}

export default BookAppointment;