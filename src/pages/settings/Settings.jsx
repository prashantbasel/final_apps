// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import './Settings.css';

// const Settings = () => {
//     const navigate = useNavigate();

//     const handleChangePassword = () => {
//         navigate('/forgot-password'); // Adjust the path according to your routing setup
//     };

//     const handleLogout = () => {
//         if (window.confirm('Are you sure you want to log out?')) {
//             navigate('/');
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="settings-container">
//                 <div className="form-and-logout">
//                     <div className="button">
//                         <button onClick={handleChangePassword} className="submit-button">
//                             Change Password
//                         </button>
//                     </div>
//                     <div className="button">
//                         <button onClick={handleLogout} className="logout-button">
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Settings;
