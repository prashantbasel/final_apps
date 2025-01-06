import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = (event) => {
        // Ask user to confirm logout
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) {
            event.preventDefault(); // Prevent logout if the user does not confirm
        }
    };

    return (
        <div className='navbar-container'>
            <nav className="navbar">
                <div className="navbar-left">

                    <img
                        src="/assets/icons/logo.png"
                        alt="Kickoff Logo"
                        className="navbar-logo"
                    />
                </div>
                <div className="navbar-center">
                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/booking" className="nav-link">Booking</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">User Profile</Link>
                        </li>         
                    </ul>
                </div>
                <div className="navbar-right">
                    {user && (
                        <div className="dropdown">
                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Welcome, {user.firstName}!
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};


export default Navbar;
