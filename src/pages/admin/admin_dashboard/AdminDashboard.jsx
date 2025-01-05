
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { createProductApi, deleteProduct, getAllProducts } from '../../../apis/Api';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         getAllProducts().then((res) => {
//             setProducts(res.data.product);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }, []);

//     const [productName, setProductName] = useState('');
//     const [productCategory, setProductCategory] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('productName', productName);
//         formData.append('productCategory', productCategory);

//         createProductApi(formData).then((res) => {
//             if (res.status === 201) {
//                 toast.success(res.data.message);
//                 window.location.reload();
//             }
//         }).catch((error) => {
//             if (error.response) {
//                 toast.error("Error: " + error.response.data.message);
//             } else {
//                 toast.error("Something went wrong");
//             }
//         });
//     };

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure want to delete this product?')) {
//             deleteProduct(id).then((res) => {
//                 if (res.status === 201) {
//                     toast.success(res.data.message);
//                     window.location.reload();
//                 }
//             }).catch((error) => {
//                 toast.error("Error: " + error.response.data.message);
//             });
//         }


//     };

//     return (
//         <>
//             <div className='admin-container'>
//                 <h3>Admin Dashboard</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Product Name</th>
//                             <th>Product Category</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product._id}>
//                                 <td>{product.productName}</td>
//                                 <td>{product.productCategory}</td>
//                                 <td>
//                                     <Link to={`/admin/update/${product._id}`} className="edit-btn">Edit</Link>
//                                     <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <button className='view-contact-btn' onClick={() => navigate('/admin/view-contact')}>View Contacts</button>
//                 <button className="add-product-btn" data-bs-toggle="modal" data-bs-target="#addProductModal">Add product</button>
//                 <button className='view-booking-btn' onClick={() => navigate('/admin/view-booking')}>View Bookings</button>
//                 <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>



//             </div>

//             {/* Add Product Modal */}
//             <div className="fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="addProductModalLabel">Create a new product</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleSubmit}>
//                                 <input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} required />
//                                 <select onChange={(e) => setProductCategory(e.target.value)} required>
//                                     <option value="">Select Category</option>
//                                     <option value="bike">Bike</option>
//                                     <option value="scooter">Scooter</option>
//                                 </select>
//                                 <button type="submit">Add Product</button>


//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteProduct, getAllProducts } from '../../../apis/Api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.product);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete this product?')) {
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    window.location.reload();
                }
            }).catch((error) => {
                toast.error("Error: " + error.response.data.message);
            });
        }
    };

    return (
        <div className='admin-container'>
            <h3>Admin Dashboard</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productCategory}</td>
                            <td>
                                <Link to={`/admin/update/${product._id}`} className="edit-btn">Edit</Link>
                                <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='view-contact-btn' onClick={() => navigate('/admin/view-contact')}>View Contacts</button>
            <button className="add-product-btn" onClick={() => navigate('/admin/add-product')}>Add product</button>
            <button className='view-booking-btn' onClick={() => navigate('/admin/view-booking')}>View Bookings</button>
            <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
