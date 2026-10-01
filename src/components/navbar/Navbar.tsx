import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import apiRequest from "../../lib/apiRequest";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser, updateUser} = useAuth()

  const navigate = useNavigate()

  const logoutUser = async () => {
    const response = await apiRequest.post("/auth/logout")
    localStorage.removeItem("user")
    updateUser(null)
    navigate("/")    
  }
  
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser?.avatar || "default-profile.avif"}
            />
            <span>{currentUser?.username || "username"}</span>
            <Link to="/profile" className="profile">
              <div className="notification">1</div>
              <span>Profile</span>
            </Link>
            <button onClick={logoutUser} style={{backgroundColor:"red"}}>Logout</button>
          </div>
        ) : (
          <div className="signing">
            <Link to={"/login"}><button>Sign In</button></Link>
            <Link to={"/register"}><button>Sign Up</button></Link>            
          </div>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;