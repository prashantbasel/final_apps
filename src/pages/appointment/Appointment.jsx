import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate here
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAppointment } from '../../apis/Api';
import Navbar from '../../components/Navbar';
import './Appointment.css';

const Appointment = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
    const vehicle = location.state?.vehicle;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [bikeNumber, setBikeNumber] = useState('');
    const [description, setDescription] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!vehicle || !description || !selectedDate || !selectedTime || !bikeNumber) {
            toast.error("Please enter all fields");
            return;
        }

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const data = {
            bikeId: vehicle._id,
            description,
            bookingDate: formattedDate,
            bookingTime: selectedTime,
            bikeNumber
        };

        addAppointment(data).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                navigate('/services'); // Navigate to Service page on success
            } else {
                toast.error(res.data.message || 'Failed to add booking');
            }
        }).catch((error) => {
            toast.error(error.response?.data.message || 'Error booking appointment');
        });
    };

    return (
        <div className="appointment-container">
            <Navbar />
            <h1 className="vehicle-title">{vehicle ? vehicle.productName : 'Ray ZR 125'}</h1>
            <div className="date-time-container">
                <div className="date-picker">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        minDate={new Date()}
                        maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                        className="custom-datepicker"
                    />
                </div>
                <div className="time-slots">
                    <h2 className="time-title">BOOKING TIME</h2>
                    <div className="time-buttons-grid">
                        {['9:00 am', '11:00 am', '1:00 pm', '2:00 pm', '4:00 pm', '6:00 pm'].map(time => (
                            <button key={time} onClick={() => handleTimeSelect(time)}
                                className={`time-button ${selectedTime === time ? 'selected' : ''}`}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="booking-details">
                <div className="input-container">
                    <input
                        type="text"
                        value={bikeNumber}
                        onChange={(e) => setBikeNumber(e.target.value)}
                        placeholder="Bike Number"
                        className="input-field"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="textarea-field"
                    />
                </div>
                <div className="next-button-container">
                    <button onClick={handleSubmit} className="next-button">NEXT</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Appointment;
