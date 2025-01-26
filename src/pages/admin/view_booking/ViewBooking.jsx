import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { getAllBookings } from '../../../apis/Api';
import './ViewBooking.css';

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBookings()
            .then((res) => {
                setBookings(res.data.bookings);
            })
            .catch((error) => {
                console.error(error);
                toast.error(
                    'Failed to fetch bookings: ' +
                        (error.response?.data.message || 'Server error')
                );
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Chart data for booking trends
    const chartData = {
        labels: bookings.map((booking) =>
            formatDate(booking.bookingDate).split(',')[0]
        ),
        datasets: [
            {
                label: 'Bookings',
                data: bookings.map((_, index) => index + 1),
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="booking-container">
            <header className="booking-header">
                <h1>View Bookings</h1>
            </header>

            <div className="booking-grid">
                {/* Booking Table */}
                <section className="table-section">
                    <h2>Booking Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact Number</th>
                                <th>Booking Date</th>
                                <th>Booking Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.contactNumber}</td>
                                    <td>{booking.bikeNumber}</td>
                                    <td>{formatDate(booking.bookingDate)}</td>
                                    <td>{booking.bookingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Booking Trends Chart */}
                <section className="chart-section">
                    <h2>Booking Trends</h2>
                    <Line data={chartData} />
                </section>
            </div>

            <button
                className="back-btn"
                onClick={() => navigate('/admin/dashboard')}
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default ViewBooking;
