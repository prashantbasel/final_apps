import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="Dashboard-container">
            <Navbar />
            <div className="content">
                <div className="main-section">
                    <img
                        src="/assets/images/sports-arena.png"
                        alt="Sports Arena"
                        className="main-image"
                    />
                </div>
            </div>

            <div className="navigation-section">
                {/* Daily Games */}
                <Link to="/daily-games" className="nav-item">
                    <img
                        src="/assets/icons/daily-games.png"
                        alt="Daily Games"
                        className="nav-icon"
                    />
                    <p>Daily Games</p>
                </Link>

                {/* My Team */}
                <Link to="/my-team" className="nav-item">
                    <img
                        src="/assets/icons/my-team.png"
                        alt="My Team"
                        className="nav-icon"
                    />
                    <p>My Team</p>
                </Link>

                {/* Friends */}
                <Link to="/friends" className="nav-item">
                    <img
                        src="/assets/icons/friends.png"
                        alt="Friends"
                        className="nav-icon"
                    />
                    <p>Friends</p>
                </Link>

                {/* View Booking */}
                <Link to="/booking-details" className="nav-item">
                    <img
                        src="/assets/icons/view-booking.png"
                        alt="View Booking"
                        className="nav-icon"
                    />
                    <p>View Booking</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
