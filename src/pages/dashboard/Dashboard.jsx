import React from 'react';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="Dashboard-container">
            <Navbar />
            <div className="content">
                {/* Main Image Section */}
                <div className="main-section">
                    <img
                        src="/assets/images/sports-arena.png"
                        alt="Sports Arena"
                        className="main-image"
                    />
                </div>
            </div>

            {/* Navigation Section at the Bottom */}
            <div className="navigation-section">
                {/* Daily Games */}
                <a href="#daily-games" className="nav-item">
                    <img
                        src="/assets/icons/daily-games.png"
                        alt="Daily Games"
                        className="nav-icon"
                    />
                    <p>Daily Games</p>
                </a>

                {/* My Team */}
                <a href="#my-team" className="nav-item">
                    <img
                        src="/assets/icons/my-team.png"
                        alt="My Team"
                        className="nav-icon"
                    />
                    <p>My Team</p>
                </a>

                {/* Friends */}
                <a href="#friends" className="nav-item">
                    <img
                        src="/assets/icons/friends.png"
                        alt="Friends"
                        className="nav-icon"
                    />
                    <p>Friends</p>
                </a>

                {/* View Booking */}
                <a href="#view-booking" className="nav-item">
                    <img
                        src="/assets/icons/view-booking.png"
                        alt="View Booking"
                        className="nav-icon"
                    />
                    <p>View Booking</p>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
