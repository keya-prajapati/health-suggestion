import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">Health Suggestion</Link>

        <div>
          {!user && (
            <>
              <Link className="btn btn-light me-2" to="/login">Login</Link>
              <Link className="btn btn-warning" to="/register">Register</Link>
            </>
          )}

          {/* Logout only on dashboard */}
          {user && location.pathname === "/dashboard" && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
