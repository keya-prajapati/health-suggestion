import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setErrorMsg("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("age", form.age);
      formData.append("gender", form.gender);
      formData.append("weight", form.weight);

      if (profilePic) {
        formData.append("profile_pic", profilePic);
      }

      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-left">
        <h1>Health Suggestion</h1>
        <p>Your Smart Health Assistant 💚</p>

        <img
          src="https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-1395.jpg"
          alt="health"
          className="auth-image"
        />
      </div>

      <div className="auth-right">

        <div className="auth-box">

          <h2>Create Account</h2>

          {errorMsg && (
            <div className="alert-error">{errorMsg}</div>
          )}

          <form onSubmit={handleRegister}>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />

            <select
  name="gender"
  value={form.gender}
  onChange={handleChange}
  className="gender-select"
>
  <option value="">👤 Select Gender</option>
  <option value="Male">👨 Male</option>
  <option value="Female">👩 Female</option>
  <option value="Other">⚧ Other</option>
</select>

            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={form.weight}
              onChange={handleChange}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="preview-img"
              />
            )}

            <button type="submit">
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;