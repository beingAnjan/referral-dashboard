import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

function Navbar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1 className="logo">Go Business</h1>
      </Link>

      <div className="nav-right">
        <button type="button" className="trial-btn">
          Try for free
        </button>

        <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;