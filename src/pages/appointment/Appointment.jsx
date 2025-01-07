import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAppointment } from '../../apis/Api';
import Navbar from '../../components/Navbar';
import './Appointment.css';

const Appointment = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [bikeNumber, setBikeNumber] = useState('');

    const availableTimes = [
        '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am',
        '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm',
        '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFromTimeChange = (e) => {
        setFromTime(e.target.value);
        if (availableTimes.indexOf(e.target.value) >= availableTimes.indexOf(toTime)) {
            setToTime('');
        }
    };

    const handleToTimeChange = (e) => {
        setToTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactNumber || !bikeNumber || !selectedDate || !fromTime || !toTime) {
            toast.error('Please fill in all the fields');
            return;
        }

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const data = {
            contactNumber,
            bookingDate: formattedDate,
            bookingTime: `${fromTime} - ${toTime}`,
            bikeNumber,
        };

        addAppointment(data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    navigate('/services');
                } else {
                    toast.error(res.data.message || 'Failed to add booking');
                }
            })
            .catch((error) => {
                if (error.response?.data?.message === 'This time slot is already booked') {
                    toast.error('This time slot is already booked. Please choose another.');
                } else {
                    toast.error(error.response?.data?.message || 'Error booking appointment');
                }
            });
    };

    return (
        <div className="appointment-container">
            <Navbar />
            <div className="appointment-form">
                <div className="date-section">
                    <h2 className="section-title">DATE</h2>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        minDate={new Date()}
                        maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                        className="custom-datepicker"
                    />
                    <div className="personal-details">
                        <h3 className="section-subtitle">PERSONAL DETAILS</h3>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="Name"
                            className="input-field"
                        />
                        <input
                            type="text"
                            value={bikeNumber}
                            onChange={(e) => setBikeNumber(e.target.value)}
                            placeholder="Contact Number"
                            className="input-field"
                        />
                    </div>
                </div>
                <div className="time-section">
                    <h2 className="section-title">TIME</h2>
                    <div className="time-select">
                        <label htmlFor="from-time" className="time-label">FROM</label>
                        <select
                            id="from-time"
                            value={fromTime}
                            onChange={handleFromTimeChange}
                            className="time-dropdown"
                        >
                            <option value="">Select Time</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className="time-select">
                        <label htmlFor="to-time" className="time-label">TO</label>
                        <select
                            id="to-time"
                            value={toTime}
                            onChange={handleToTimeChange}
                            className="time-dropdown"
                            disabled={!fromTime}
                        >
                            <option value="">Select Time</option>
                            {availableTimes
                                .filter((time) => availableTimes.indexOf(time) > availableTimes.indexOf(fromTime))
                                .map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                        </select>
                    </div>
                    <div className="time-summary">
                        <h3 className="summary-title">SELECTED TIME:</h3>
                        {fromTime && toTime ? (
                            <div className="time-box">
                                {fromTime} - {toTime}
                            </div>
                        ) : (
                            <div className="time-box placeholder">No time selected</div>
                        )}
                    </div>
                    <div className="price-range">
                        <h3 className="price-title">PRICE RANGE</h3>
                        <div className="price-item">
                            <span>6:00 am - 10:00 am</span>
                            <span className="price">1000 NPR</span>
                        </div>
                        <div className="price-item">
                            <span>10:00 am - 6:00 pm</span>
                            <span className="price">1200 NPR</span>
                        </div>
                        <div className="price-item">
                            <span>6:00 pm - 9:00 pm</span>
                            <span className="price">1500 NPR</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="confirm-button-container">
                <button onClick={handleSubmit} className="confirm-button">CONFIRM BOOKING</button>
            </div>
            <ToastContainer />
        </div>

    );
};

export default Appointment;
