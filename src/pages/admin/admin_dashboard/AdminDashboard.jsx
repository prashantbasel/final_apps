
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
