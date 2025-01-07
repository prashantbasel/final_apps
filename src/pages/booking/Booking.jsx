// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllProducts } from '../../apis/Api';
// import Navbar from '../../components/Navbar';
// import { toast } from 'react-toastify';
// import './Booking.css';

// const Booking = () => {
//     const [products, setProducts] = useState([]);
//     const [selectedVehicle, setSelectedVehicle] = useState(null); // Change to null to handle the entire object
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         getAllProducts()
//             .then((res) => {
//                 if (res.status === 201) {
//                     setProducts(res.data.product);
//                 }
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setLoading(false);
//             });
//     }, []);

//     const handleSelectVehicle = (product) => {
//         setSelectedVehicle(product); // Now saving the entire product object
//     };

//     const handleNextClick = () => {
//         if (selectedVehicle) {
//             // Pass the entire vehicle object through navigate
//             navigate('/appointment', { state: { vehicle: selectedVehicle } });
//         } else {
//             toast.warn('Please select a vehicle first.', {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     };

//     if (loading) {
//         return <div className="flex items-center justify-center h-screen">Loading...</div>;
//     }

//     return (
//         <div className="booking-container">
//             <Navbar />
//             <div className="content-container">
//                 <div className="vehicle-list">
//                     <h2>Select Your Vehicle</h2>
//                     {products.map((product) => (
//                         <div 
//                             key={product._id} 
//                             onClick={() => handleSelectVehicle(product)}
//                             className={`vehicle-item ${selectedVehicle && selectedVehicle._id === product._id ? 'selected' : ''}`}
//                         >
//                             {product.productName} ({product.productCategory})
//                         </div>
//                     ))}
//                 </div>
//                 <div className="vehicle-image-and-info">
//                     <div className="vehicle-image">
//                         <img src="assets/images/booking.png" alt="Select Vehicle" />
//                     </div>
//                     <div className="vehicle-info">
//                         <div className="selected-vehicle-info">
//                             Your Vehicle: {selectedVehicle ? `${selectedVehicle.productName} (${selectedVehicle.productCategory})` : 'None Selected'}
//                         </div>
//                         <button className="next-button" onClick={handleNextClick}>NEXT</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Booking;
