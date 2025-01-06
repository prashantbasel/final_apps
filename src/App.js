
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import './App.css';
// import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { ForgotPassword } from "./pages/forgot_password/ForgotPassword";
import HomePage from "./pages/homepage/homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import UpdateProducts from "./pages/admin/update_product/UpdateProduct";
import ViewBooking from "./pages/admin/view_booking/ViewBooking";
import ViewContact from "./pages/admin/view_contact/ViewContact";
import Appointment from "./pages/appointment/Appointment";
import Booking from "./pages/booking/Booking";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";

import Add from "./pages/admin/admin_dashboard/Add";
import Services from "./pages/services/Services";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";
import DailyGame from "./pages/daily_games/DailyGames";

// import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";

function App() {
    return (
        <Router>

            {/* <Navbar /> */}
            <ToastContainer />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />



                {/* Admin routes */}
                <Route element={<AdminRoutes />}>

                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/admin/update/:id' element={<UpdateProducts />} />
                    <Route path="/admin/view-booking" element={<ViewBooking />} />
                    <Route path="admin/view-contact" element={<ViewContact />} />
                    <Route path="/admin/add-product" element={<Add />} />


                </Route>
                {/* User routes */}
                <Route element={<UserRoutes />}>

                    <Route path='/profile' element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/forgot_password" element={<ForgotPassword />} />
                    <Route path="/daily-games" element={<DailyGame />} />
                    






                </Route>
            </Routes>

        </Router>
    );
}

export default App;
