import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllContacts } from '../../../apis/Api';
import { Line } from 'react-chartjs-2';
import './ViewContact.css';

const ViewContact = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllContacts()
            .then((response) => {
                setContacts(response.data.contacts);
            })
            .catch((error) => {
                console.error('Failed to fetch contacts:', error);
                toast.error(
                    'Failed to fetch contacts: ' +
                        (error.response?.data.message || 'Server error')
                );
            });
    }, []);

    const chartData = {
        labels: contacts.map((contact) =>
            new Date(contact.createdAt).toLocaleDateString()
        ),
        datasets: [
            {
                label: 'Messages Received',
                data: contacts.map((_, index) => index + 1),
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="view-contact-container">
            <header className="view-contact-header">
                <h1>View Contacts</h1>
            </header>

            <div className="contact-grid">
                {/* Contact Table */}
                <section className="table-section">
                    <h2>Contact Details</h2>
                    <div className="view-table-container">
                        <table className="view-styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Contact Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>
                                            {contact.firstName} {contact.lastName}
                                        </td>
                                        <td>{contact.email}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            {contact.createdAt
                                                ? new Date(contact.createdAt).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Analytics Chart */}
                <section className="chart-section">
                    <h2>Messages Analytics</h2>
                    <Line data={chartData} />
                </section>
            </div>

            <button
                onClick={() => navigate('/admin/dashboard')}
                className="view-back-button"
            >
                Back to Dashboard
            </button>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ViewContact;
