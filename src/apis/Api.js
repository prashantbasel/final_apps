import axios from "axios";

// creating backend Config! 

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-type": "multipart/form-data"
    }
})
const config = {
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
}

// test api 
export const testApi = () => Api.get('/test')

// register api
export const registerUserApi = (data) => Api.post('/api/user/create', data)

// login api
export const loginUserApi = (data) => Api.post('/api/user/login', data)

// create product api
export const createProductApi = (data) => Api.post('/api/product/create', data)


// get all products api
export const getAllProducts = () => Api.get('/api/product/get_all_products', config)


// get single product 
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)
// delete
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config)
// update
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config)

export const paginationproduct = (page, limit) => Api.get(`/api/product/get_all_products?page=${page}&limit=${limit}`, config)

// for appointment 

export const addAppointment = (data) => Api.post('/api/booking/add', data,config)

// Fetch all booking items API
export const getAllBookings = () => Api.get('/api/booking/all', config);

// forget password
export const ForgetPasswordApi = (data) => Api.post("/api/user/forgot_password", data);
// otp
export const verifyOtpApi = (data) => Api.post("/api/user/verify_otp", data);

// Api.js

export const addAppointmentCheck = (data) => Api.post('/api/booking/check-timeslot', data, config);

// Fetch all contact items API
export const getAllContacts = () => Api.get('/api/contact/all', config);


// Get user profile API
export const getUserProfileApi = () => Api.get('/api/user/profile', config);
 
// Update user profile API
export const updateUserProfileApi = (data) => Api.put('/api/user/profile', data, config);


