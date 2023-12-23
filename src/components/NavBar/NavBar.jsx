import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">

      <ul>
        <div>
          <li className="brand">
            <Link className = "navtext" to="/" style={{ textDecoration: "none" }}>
              <b className = "navtextgnarhealth">GNAR HEALTH</b> <p className="description">Health tips for skateboarders</p>
            </Link>
          </li>          
        </div>
        <div className="navchoices">
          <ul>
          <li>
            <Link className = "navtext option" style={{ textDecoration: "none" }} to = "/about"> About </Link>
          </li>        
          <li>
            <Link className = "navtext option" style={{ textDecoration: "none" }} to = "/createpost/"> Post </Link>
          </li>
          <li>
            <Link className = "navtext option" style={{ textDecoration: "none" }} to = "/favorites/">Favorites</Link>
          </li>         
          <li>
            <Link className = "navtext option" style={{ textDecoration: "none" }} to = "/profile/"> Profile</Link>
          </li>
          <li>
            {user ? (
              <button className = 'loginlogout option' onClick={logoutUser} style={{ textDecoration: "none" }}>Logout</button>
            ) : (
              <button className = 'loginlogout option' onClick={() => navigate("/login")} style={{ textDecoration: "none" }}>Login</button>
            )}
          </li> 
          </ul>          
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
