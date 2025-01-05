import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleProduct, updateProduct } from '../../../apis/Api';
import './UpdateProduct.css'; // Import the new CSS file

const UpdateProduct = () => {
    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(id).then((res) => {
            console.log(res.data);
            setProductName(res.data.product.productName);
            setProductCategory(res.data.product.productCategory);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productCategory', productCategory);

        updateProduct(id, formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                toast.error(error.response.data.message);
            } else if (error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        });
    };

    return (
        <div className='container mt-3'>
            <h3 className='update-product-title'>Update Product for <span className='text-danger'>{productName}</span></h3>
            <div className='form-container'>
                <form>
                    <label className='form-label'>Product Name</label>
                    <input 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        className='form-control' 
                        type="text" 
                        placeholder='Enter your product name' 
                    />
                    <label className='form-label mt-3'>Choose Category</label>
                    <select 
                        value={productCategory} 
                        onChange={(e) => setProductCategory(e.target.value)} 
                        className='form-control'
                    >
                        <option value="select">Choose category</option>
                        <option value="bike">Bike</option>
                        <option value="scooter">Scooter</option>
                    </select>
                    <button onClick={handleUpdate} className='btn btn-primary w-100 mt-3'>Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
