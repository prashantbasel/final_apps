import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="Dashboard-container">
            <Navbar />
            <div className="content">
                {/* Carousel */}
                <div
                        id="carouselExampleCaptions"
                        className="carousel slide mt-4"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://images.unsplash.com/photo-1536122985607-4fe00b283652?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="d-block w-100"
                                    alt="Appliance 1"
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Play Hard, Dream Big, Book Easy </h5>
                                    
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://i.pinimg.com/1200x/9c/2d/20/9c2d204666b7997a92ef36254f44f245.jpg"
                                    className="d-block w-100"
                                    alt="Appliance 2"
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Your Game, Your Time , Your Glory</h5>
                                    
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/008db365350803.602a9fe151bf7.jpg"
                                    className="d-block w-100"
                                    alt="Appliance 3"
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>In the End, Effort Always Wins</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                <div className="main-section">
                    
                </div>
            </div>

            {/* Navigation Section */}
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
