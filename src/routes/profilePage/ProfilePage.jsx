import Chat from "../../components/Chat/Chat";
import List from "../../components/List/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authcontext";

function ProfilePage() {
  const {currentUser, updateUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutUser = async () => {
    const response = await apiRequest.post("/auth/logout")
    localStorage.removeItem("user")
    updateUser(null)
    navigate("/")    
  }
    const posts = useLoaderData()
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update"><button>Update Profile</button></Link>
          </div>

          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "default-profile.avif"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={logoutUser}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/profile/newpost"><button>Create New Post</button></Link>
          </div>
          <List posts={posts} />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={posts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;