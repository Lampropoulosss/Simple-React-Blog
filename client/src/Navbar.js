import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Blog Website</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {Cookies.get("webToken") && <Link to="/create">New Blog</Link>}
        {!Cookies.get("webToken") && <Link to="/register">Register</Link>}
        {!Cookies.get("webToken") && <Link to="/login">Login</Link>}
        {Cookies.get("webToken") && <Link to="/logout">Logout</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
