// ViewBooking.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllBookings } from '../../../apis/Api';
import './ViewBooking.css'; // Assuming you have a CSS file for styles

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBookings().then((res) => {
            setBookings(res.data.bookings);
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to fetch bookings: " + (error.response?.data.message || "Server error"));
        });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='booking-container'>
            <h3>View Bookings</h3>
            <table>
                <thead>
                    <tr>
                        <th>Bike Number</th>
                        <th>Description</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.bikeNumber}</td>
                            <td>{booking.description}</td>
                            <td>{formatDate(booking.bookingDate)}</td>
                            <td>{booking.bookingTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='back-btn' onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
        </div>
    );
};

export default ViewBooking;
