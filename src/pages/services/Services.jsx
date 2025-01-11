import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Services.css';
import KhaltiCheckout from 'khalti-checkout-web';
import config from '../../components/khaltiConfig';

const Services = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, phone, date, time } = location.state || {};
    const [fromTime, toTime] = time ? time.split(' - ') : [];
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const priceRanges = [
        { range: [6, 10], price: 1000 },
        { range: [10, 18], price: 1200 },
        { range: [18, 21], price: 1500 },
    ];

    const calculateTotalPrice = () => {
        if (!fromTime || !toTime) return 0;

        const fromHour =
            parseInt(fromTime.split(':')[0]) +
            (fromTime.includes('pm') && fromTime.split(':')[0] !== '12' ? 12 : 0);
        const toHour =
            parseInt(toTime.split(':')[0]) +
            (toTime.includes('pm') && toTime.split(':')[0] !== '12' ? 12 : 0);

        let total = 0;

        for (let hour = fromHour; hour < toHour; hour++) {
            for (const range of priceRanges) {
                if (hour >= range.range[0] && hour < range.range[1]) {
                    total += range.price;
                }
            }
        }

        return total;
    };

    const handleKhaltiPayment = () => {
        const checkout = new KhaltiCheckout(config);
        checkout.show({ amount: calculateTotalPrice() * 100 }); // Amount in paisa
    };

    const handlePayOnArrival = () => {
        setShowSuccessModal(true); // Show success modal
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/dashboard'); // Navigate to the dashboard
    };

    return (
        <div className="services-page">
            <Navbar />
            <div className="container">
                <div className="booking-details">
                    <h2>Booking Details</h2>
                    <p><strong>Name:</strong> {name || 'N/A'}</p>
                    <p><strong>Phone Number:</strong> {phone || 'N/A'}</p>
                    <p><strong>Date:</strong> {date || 'N/A'}</p>
                    <p><strong>Time:</strong> {time || 'N/A'}</p>
                    <p><strong>Total Amount:</strong> <span>{calculateTotalPrice()} NPR</span></p>
                    <div className="payment-buttons">
                        <button className="pay-online" onClick={handleKhaltiPayment}>Pay Online</button>
                    </div>
                </div>
                <div className="price-range-container">
                    <div className="price-range">
                        <h3>Price Range</h3>
                        <p>6:00 am - 10:00 am: <span>1000 NPR</span></p>
                        <p>10:00 am - 6:00 pm: <span>1200 NPR</span></p>
                        <p>6:00 pm - 9:00 pm: <span>1500 NPR</span></p>
                    </div>
                    <button className="pay-arrival" onClick={handlePayOnArrival}>Pay on Arrival</button>
                </div>
            </div>

            {showSuccessModal && (
                <div className="success-modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="success-icon">✔</div>
                        <h3>Success</h3>
                        <p>Booking Successfully</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
