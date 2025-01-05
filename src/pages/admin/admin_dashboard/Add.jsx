import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createProductApi } from '../../../apis/Api';
import './Add.css';

const Add = () => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productCategory', productCategory);

        createProductApi(formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
                // Navigate back to the dashboard or clear the form
            }
        }).catch((error) => {
            if (error.response) {
                toast.error("Error: " + error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        });
    };

    return (
        <div className='add-product-container'>
            <h3>Create a New Product</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    onChange={(e) => setProductName(e.target.value)} 
                    required 
                />
                <select 
                    onChange={(e) => setProductCategory(e.target.value)} 
                    required
                >
                    <option value="">Select Category</option>
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                </select>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Add;
