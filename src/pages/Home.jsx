import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* NAVBAR */}
      <nav className="home-navbar">
        <h2 className="logo">Health Suggestion 💚</h2>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="home-wrapper" id="home">
        <div className="home-content">
          <div className="home-text">
            <h1>Your Smart AI Health Assistant</h1>
            <p>
              Get instant health suggestions, daily wellness tips,
              and AI-powered chatbot support for a healthier life.
            </p>
            <div className="home-buttons">
              <Link to="/login" className="btn-primary-custom">Get Started</Link>
              <Link to="/register" className="btn-outline-custom">Create Account</Link>
            </div>
          </div>

          <div className="home-image">
            <img
              src="https://img.freepik.com/free-vector/medical-team-concept-illustration_114360-1395.jpg"
              alt="health"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2>About Health Suggestion 💚</h2>
            <p>
              Health Suggestion is an AI-powered healthcare platform
              designed to provide smart medical guidance, chatbot-based
              health advice, and daily wellness recommendations.
            </p>
            <p>
              Our mission is to make healthcare assistance simple,
              accessible, and intelligent for everyone.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">🩺<h4>Our Mission</h4><p>Deliver reliable and smart health suggestions using AI.</p></div>
            <div className="about-card">🌍<h4>Our Vision</h4><p>To become a trusted digital healthcare companion worldwide.</p></div>
            <div className="about-card">🤖<h4>AI Technology</h4><p>Advanced chatbot system for instant health advice.</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Email: support@healthsuggestion.com</p>
        <p>Phone: +91 9876543210</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Health Suggestion App | Made with 💚</p>
      </footer>
    </div>
  );
}

export default Home;