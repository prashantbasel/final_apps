import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes = () => {
    // get user information 
    const user = JSON.parse(localStorage.getItem("user"))

    // check user

    // check is admin = true

    // if true : Access the route of admin (Outlet)

    // if false : Navigate to login 

    return user != null  ? <Outlet /> 
    : <Navigate to={"/login"} />
}

export default UserRoutes
