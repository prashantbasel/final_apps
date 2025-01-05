import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="content">
                {/* Image on the left */}
                <div className="image">
                    <img src="/assets/images/maradona.png" alt="Futsal" className="futsal-image" />
                </div>

                {/* Text on the right */}
                <div className="text">
                    <h1>Futsal Booking Made Easy by kickoff </h1>
                    <p>
                        Reserve your futsal court effortlessly, manage your games, and pay online.
                        Book now and step onto the court!
                    </p>
                    <div className="buttons">
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
