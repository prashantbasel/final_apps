import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contact/contact', formData);
            toast.success(response.data.message || 'Form submitted successfully');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            toast.error((error.response?.data?.message) || 'Error submitting form');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="contact-container">
                {/* Contact Details */}
                <div className="contact-details">
                    <h2>Contact Details</h2>
                    <p><strong>Address:</strong> Sitapaila, Kathmandu 44600</p>
                    <p><strong>Phone:</strong> (+977) 1 4000000</p>
                    <p><strong>Cell:</strong> (+977) 9851000000, 9810000000</p>
                    <p><strong>Email:</strong> info@Kickoff.com</p>
                    <p>Kickoff is the only page for One Futsal, which is located in Sitapaila.</p>
                </div>

                {/* Opening Hours */}
                <div className="opening-hours">
                    <h2>Opening Hours</h2>
                    <p>Sunday - Friday: 8 - 9</p>
                </div>

                {/* Contact Us Form */}
                <div className="contact-us">
                    <h2>Contact Us</h2>
                    <p>For inquiries on services, please leave a message and we will get back to you within 24 hours. We look forward to hearing from you!</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Full Name"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder=" Phone Number"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                required
                                value={formData.message}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Contact;
