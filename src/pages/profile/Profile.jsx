// Profile.jsx
import React, { useState, useEffect } from "react";
import { getUserProfileApi, updateUserProfileApi } from "../../apis/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [gameStatus, setGameStatus] = useState(
    localStorage.getItem("gameStatus") || "in" // Default to "I’m In" if nothing is saved
  );

  useEffect(() => {
    getUserProfileApi()
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.firstName);
        setPhone(res.data.phone);
      })
      .catch((error) => {
        toast.error(`Error fetching user data: ${error.message || "Unknown error"}`);
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updateData = { firstName, phone };
    if (passwordChanged) {
      updateData.password = password;
    }
    updateUserProfileApi(updateData)
      .then((res) => {
        toast.success("Profile updated successfully");
        setUser(res.data);
        setEditMode(false);
        if (passwordChanged) {
          setPassword("");
          setPasswordChanged(false);
        }
      })
      .catch((error) => {
        toast.error(`Error updating profile: ${error.message || "Unknown error"}`);
      });
  };

  const handleGameStatusChange = (e) => {
    const newStatus = e.target.value;
    setGameStatus(newStatus);
    localStorage.setItem("gameStatus", newStatus); // Save the status to localStorage
  };

  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="profile-container">
        {/* User Profile Card */}
        <div className="profile-card">
          {!editMode ? (
            <>
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {user.firstName ? user.firstName[0] : "U"}
                </div>
                <h2 className="profile-name">{user.firstName}</h2>
                <a href="#view-profile" className="view-profile-link">
                  View Profile
                </a>
              </div>
              <div className="profile-details">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Password:</strong> {"********"}
                </p>
              </div>
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdateProfile} className="edit-profile-form">
              <h3 className="edit-profile-title">Edit Your Profile</h3>
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordChanged(true);
                  }}
                  className="form-input"
                  placeholder="Enter a new password"
                />
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Game Status Section */}
        <div className="game-status-card">
          <h4>Game Status</h4>
          <select
            className={`game-status-dropdown ${gameStatus}`}
            value={gameStatus}
            onChange={handleGameStatusChange}
          >
            <option value="in">I’m In</option>
            <option value="out">I’m Out</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Profile;
