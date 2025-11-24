import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const brandStyle = {
  fontWeight: 700,
  fontSize: "1.15rem",
};

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderLinks = () => {
    if (!currentUser) {
      return (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </>
      );
    }

    if (currentUser.role === "customer") {
      return (
        <>
          <Link to="/customer/new-booking">New Booking</Link>
          <Link to="/customer/bookings">My Bookings</Link>
          <Link to="/privacy">Privacy</Link>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      );
    }

    if (currentUser.role === "staff") {
      return (
        <>
          <Link to="/staff/dashboard">Staff Dashboard</Link>
          <Link to="/privacy">Privacy</Link>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="navbar">
      <Link to="/" style={brandStyle}>
        CleanEasy
      </Link>
      <nav className="nav-links">{renderLinks()}</nav>
    </header>
  );
}

export default Navbar;
