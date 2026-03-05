require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const dayjs = require("dayjs");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

/* ================= IMAGE UPLOAD SETUP ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

app.use("/uploads", express.static("uploads"));

/* ================= MYSQL CONNECTION ================= */

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "healthapp",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

/* ================= EMAIL SETUP ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= REGISTER ================= */

app.post("/api/register", upload.single("profile_pic"), async (req, res) => {
  try {
    const { name, email, password, age, gender, weight } = req.body;
    const profile_pic = req.file ? req.file.filename : null;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) {
          console.log("DB ERROR:", err);
          return res.status(500).json({ success: false });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
        INSERT INTO users
        (name,email,password,age,gender,weight,photo)
        VALUES (?,?,?,?,?,?,?)
        `;

        db.query(
          sql,
          [
            name,
            email,
            hashedPassword,
            age || null,
            gender || null,
            weight || null,
            profile_pic,
          ],
          (err) => {
            if (err) {
              console.log("REGISTER ERROR:", err);
              return res.status(500).json({
                success: false,
                message: "Registration failed",
              });
            }

            res.json({
              success: true,
              message: "Registration successful",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= LOGIN ================= */

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false });

    if (result.length === 0)
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        weight: user.weight,
        photo: user.photo,
      },
    });
  });
});

/* ================= GET PROFILE ================= */

app.get("/api/profile/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id,name,email,age,gender,weight,photo FROM users WHERE id=?`,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        user: result[0],
      });
    }
  );
});

/* ================= UPDATE PROFILE ================= */

app.put("/api/profile/:id", upload.single("profile_pic"), (req, res) => {
  const { id } = req.params;
  const { name, age, gender, weight } = req.body;
  const profile_pic = req.file ? req.file.filename : null;

  const sql = `
  UPDATE users
  SET name=?, age=?, gender=?, weight=?, photo=?
  WHERE id=?
  `;

  db.query(sql, [name, age, gender, weight, profile_pic, id], (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  });
});

/* ================= DOCTORS ================= */

app.get("/api/doctors", (req, res) => {
  db.query("SELECT * FROM tbl_doctors", (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json(results);
  });
});

/* ================= BOOK APPOINTMENT ================= */

app.post("/api/appointments/add", (req, res) => {
  const { userId, doctorId, date, time, symptoms } = req.body;

  if (!userId || !doctorId || !date || !time)
    return res.status(400).json({ success: false });

  const checkSql = `
    SELECT * FROM tbl_appointments
    WHERE doctor_id=? AND date=? AND time=? AND status='Booked'
  `;

  db.query(checkSql, [doctorId, date, time], (err, result) => {
    if (err) return res.status(500).json({ success: false });

    if (result.length > 0)
      return res.json({ success: false, message: "Slot already booked" });

    const insertSql = `
      INSERT INTO tbl_appointments
      (user_id,doctor_id,date,time,symptoms,status,reminder_24_sent)
      VALUES (?,?,?,?,?,'Booked',FALSE)
    `;

    db.query(insertSql, [userId, doctorId, date, time, symptoms], (err) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        message: "Appointment booked successfully",
      });
    });
  });
});

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});