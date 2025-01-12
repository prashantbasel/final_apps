
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

import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";

import Add from "./pages/admin/admin_dashboard/Add";
import BookingDetails from "./pages/booking_details/BookingDetails";
import DailyGame from "./pages/daily_games/DailyGames";
import Friend from "./pages/friends/Friends";
import Myteam from "./pages/my_team/MyTeam";
import Services from "./pages/services/Services";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";

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
                    <Route path="/booking" element={<Appointment />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/services" element={<Services />} />
                    <Route path="/forgot_password" element={<ForgotPassword />} />
                    <Route path="/daily-games" element={<DailyGame />} />
                    <Route path="/my-team" element={<Myteam />} />
                    <Route path="/friends" element={<Friend />} />
                    <Route path="/booking-details" element={<BookingDetails />} />








                </Route>
            </Routes>

        </Router>
    );
}

export default App;
