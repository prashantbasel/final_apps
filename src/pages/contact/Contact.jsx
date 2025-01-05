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
            toast.success(response.data.message || 'Form submitted successfully'); // Using toast for notifications
            // Reset form only if successful
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            toast.error((error.response && error.response.data && error.response.data.message) || 'Error submitting form'); // More robust error handling
        }
    };

    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <div className="contact-details">
                    <h2>Contact Details</h2>
                    <p><strong>Address:</strong> Sitapaila, Kathmandu 44600</p>
                    <p><strong>Phone:</strong> (+977) 1 4000000</p>
                    <p><strong>Cell:</strong> (+977) 9851000000, 9810000000</p>
                    <p><strong>Email:</strong> info@motomaintain.com</p>
                    <p>Motomaintain is the only page for Yamaha, which is located in the heart of Kathmandu.</p>
                </div>
                <div className="opening-hours">
                    <h2>Opening Hours</h2>
                    <p>Sunday - Friday: 9 - 6</p>
                    <p>Saturday: Closed</p>
                </div>
                <div className="contact-us">
                    <h2>Contact Us</h2>
                    <p>For inquiries on services, please leave a message and we will get back to you within 24 hours. We look forward to hearing from you!</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="firstName" placeholder="First Name" required style={{ marginRight: '10px' }} value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Contact;
