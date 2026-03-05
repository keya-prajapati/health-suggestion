// src/pages/Profile.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    photo: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= FETCH PROFILE =================

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user.id}`
        );

        if (res.data.success) {
          setProfile(res.data.user);
        }
      } catch (err) {
        console.error(err);
        setMessage("⚠️ Failed to load profile.");
      }
    };

    fetchProfile();
  }, [user, navigate]);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SAVE PROFILE =================

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/profile/${user.id}`,
        profile
      );

      if (res.data.success) {
        setMessage("✅ Profile updated successfully!");
        setEditMode(false);
      } else {
        setMessage("⚠️ " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">

      <h2>👤 Your Profile</h2>

      {message && <div className="message">{message}</div>}

      <div className="profile-card">

        {/* ================= PHOTO ================= */}

        <div className="photo-section">

          <img
            src={
              profile.photo
                ? profile.photo
                : "https://via.placeholder.com/150"
            }
            alt="profile"
          />

        </div>

        {/* ================= INFO ================= */}

        <div className="info-section">

          <label>Name:</label>

          {editMode ? (
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.name}</p>
          )}

          <label>Email:</label>
          <p>{profile.email}</p>

          <label>Age:</label>

          {editMode ? (
            <input
              type="number"
              name="age"
              value={profile.age || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.age}</p>
          )}

          <label>Gender:</label>

          {editMode ? (
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{profile.gender}</p>
          )}

          <label>Weight (kg):</label>

          {editMode ? (
            <input
              type="number"
              name="weight"
              value={profile.weight || ""}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.weight}</p>
          )}

        </div>

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="profile-buttons">

        {editMode ? (
          <>
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>

            <button onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}

      </div>

    </div>
  );
}

export default Profile;