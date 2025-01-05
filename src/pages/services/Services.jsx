import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import './Services.css';
import KhaltiCheckout from "khalti-checkout-web";
import config from '../../components/khaltiConfig';

const Services = () => {
    const [detailedServiceSelected, setDetailedServiceSelected] = useState(true);
    const [normalServiceSelected, setNormalServiceSelected] = useState(false);
    const [detailedServices, setDetailedServices] = useState({
        engineOil: true,
        airFilter: true,
        movieFilter: true,
        laborCost: true,
    });
    const [normalServices, setNormalServices] = useState({
        engineOil: true,
        airFilter: true,
        movieFilter: true,
        laborCost: true,
    });
    const [showModal, setShowModal] = useState(false);

    const prices = {
        engineOil: 1100,
        airFilter: 500,
        movieFilter: 400,
        laborCost: 1000,
    };

    const calculateTotalPrice = () => {
        let total = 0;
        if (detailedServiceSelected) {
            total = Object.keys(detailedServices).reduce((acc, service) => {
                return acc + (detailedServices[service] ? prices[service] : 0);
            }, 0);
        } else {
            total = Object.keys(normalServices).reduce((acc, service) => {
                return acc + (normalServices[service] ? prices[service] : 0);
            }, 0);
        }
        return total;
    };

    const handleServiceSelection = (type, service) => {
        if (type === 'detailed') {
            setDetailedServices({
                ...detailedServices,
                [service]: !detailedServices[service],
            });
        } else {
            setNormalServices({
                ...normalServices,
                [service]: !normalServices[service],
            });
        }
    };

    const handleServiceTypeChange = (type) => {
        if (type === 'detailed') {
            setDetailedServiceSelected(true);
            setNormalServiceSelected(false);
        } else {
            setDetailedServiceSelected(false);
            setNormalServiceSelected(true);
        }
    };

    const handleNextButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleKhaltiPayment = () => {
        let checkout = new KhaltiCheckout(config);
        checkout.show({amount: 200})
    }
     

    return (
        <div className="services-page">
            <div className="navbar-wrapper">
                <Navbar />
            </div>
            <div className="services-container">
                <h2 className="services-header">SELECT SERVICES</h2>
                <div className={`service-option ${detailedServiceSelected ? 'selected' : ''}`} onClick={() => handleServiceTypeChange('detailed')}>
                    <div className="service-header">
                        <span>Detailed Servicing</span>
                        <span>2 Hrs</span>
                        <div className="price-list">NPR 3000</div>
                    </div>
                    <div className="service-content">
                        <div className="service-item">
                            <div className="service-details">
                                <span>Engine Oil</span>
                                <span>Air Filter</span>
                                <span>Movie Filter</span>
                                <span>Labor Cost</span>
                            </div>
                            <div className="service-prices">
                                <span>NPR {prices.engineOil}</span>
                                <span>NPR {prices.airFilter}</span>
                                <span>NPR {prices.movieFilter}</span>
                                <span>NPR {prices.laborCost}</span>
                            </div>
                            <div className="service-checkboxes">
                                {Object.keys(detailedServices).map(service => (
                                    <input
                                        key={service}
                                        type="checkbox"
                                        checked={detailedServices[service]}
                                        onChange={() => handleServiceSelection('detailed', service)}
                                        disabled={!detailedServiceSelected}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`service-option ${normalServiceSelected ? 'selected' : ''}`} onClick={() => handleServiceTypeChange('normal')}>
                    <div className="service-header">
                        <span>Normal Servicing</span>
                        <span>2 Hrs</span>
                        <div className="price-list">NPR 2500</div>
                    </div>
                    <div className="service-content">
                        <div className="service-item">
                            <div className="service-details">
                                <span>Engine Oil</span>
                                <span>Air Filter</span>
                                <span>Movie Filter</span>
                                <span>Labor Cost</span>
                            </div>
                            <div className="service-prices">
                                <span>NPR {prices.engineOil}</span>
                                <span>NPR {prices.airFilter}</span>
                                <span>NPR {prices.movieFilter}</span>
                                <span>NPR {prices.laborCost}</span>
                            </div>
                            <div className="service-checkboxes">
                                {Object.keys(normalServices).map(service => (
                                    <input
                                        key={service}
                                        type="checkbox"
                                        checked={normalServices[service]}
                                        onChange={() => handleServiceSelection('normal', service)}
                                        disabled={!normalServiceSelected}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="total-price">
                    Total Price : {calculateTotalPrice()}
                </div>
                <button className="next-button" onClick={handleNextButtonClick}>NEXT</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <h2>Select the payment method:</h2>
                        <div className="modal-body">
                            <button className="payment-button">Pay on arrival</button>
                            <button className="payment-button" onClick={handleKhaltiPayment}>Khalti</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
