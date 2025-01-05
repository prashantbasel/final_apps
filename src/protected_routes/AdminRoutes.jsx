import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoutes = () => {
// get user information 
const user = JSON.parse(localStorage.getItem("user"))

// check user

// check is admin = true

// if true : Access the route of admin (Outlet)

// if false : Navigate to login 

return user != null && user.isAdmin ? <Outlet /> : <Navigate to={"/login"} />

}

export default AdminRoutes
