import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { FaChartBar, FaClipboardList, FaEye, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Data for the charts
    const lineData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Earnings (Nrs)',
                data: [10000, 5000, 6000, 5000, 6000, 5000, 12000],
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ['july', 'august', 'september', 'october', 'november', 'december', 'january'],
        datasets: [
            {
                label: 'Revenue (Nrs)',
                data: [500000, 600000, 400000, 700000, 800000, 900000, 100000],
                backgroundColor: '#1e88e5',
            },
        ],
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">Admin Panel</h2>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/admin/dashboard')}>
                            <FaChartBar className="icon" /> Dashboard
                        </li>
                        <li onClick={() => navigate('/admin/view-contact')}>
                            <FaClipboardList className="icon" /> View Contacts
                        </li>
                        <li onClick={() => navigate('/admin/view-booking')}>
                            <FaEye className="icon" /> View Bookings
                        </li>
                        <li onClick={() => navigate('/login')}>
                            <FaSignOutAlt className="icon" /> Log Out
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Dashboard Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Admin Dashboard</h1>
                </header>

                <div className="dashboard-grid">
                    {/* Line Chart */}
                    <div className="card">
                        <h3>Weekly Earnings</h3>
                        <Line data={lineData} />
                    </div>

                    {/* Bar Chart */}
                    <div className="card">
                        <h3>Monthly Revenue</h3>
                        <Bar data={barData} />
                    </div>

                    {/* Placeholder for other metrics */}
                    <div className="card">
                        <h3>Overview</h3>
                        <div className="chart-placeholder">32%</div>
                    </div>
                    <div className="card">
                        <h3>Overview</h3>
                        <div className="chart-placeholder">45%</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
