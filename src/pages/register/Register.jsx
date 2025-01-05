    import React, { useState } from "react";
    import { toast } from "react-toastify";
    import { registerUserApi } from "../../apis/Api";
    import './Register.css';

    const Register = () => {    
        const [firstName, setFirstName] = useState('');
        const [phone, setPhone] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const [firstNameError, setFirstNameError] = useState('');
        const [phoneError, setPhoneError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [confirmPasswordError, setConfirmPasswordError] = useState('');

        const handleFirstName = (e) => setFirstName(e.target.value);
        const handlePhone = (e) => setPhone(e.target.value);
        const handleEmail = (e) => setEmail(e.target.value);
        const handlePassword = (e) => setPassword(e.target.value);
        const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

        const validate = () => {
            let isValid = true;
            setFirstNameError('');
            setPhoneError('');
            setEmailError('');
            setPasswordError('');
            setConfirmPasswordError('');

            if (firstName.trim() === '') {
                setFirstNameError("Full Name is required!");
                isValid = false;
            }
            if (phone.trim() === '') {
                setPhoneError("Phone number is required!");
                isValid = false;
            } else if (!/^\d{10}$/.test(phone)) {
                setPhoneError("Phone number is invalid!");
                isValid = false;
            }
            if (email.trim() === '') {
                setEmailError("Email is required!");
                isValid = false;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                setEmailError("Email is invalid!");
                isValid = false;
            }
            if (password.trim() === '') {
                setPasswordError("Password is required!");
                isValid = false;
            } else if (password.length < 6) {
                setPasswordError("Password must be at least 6 characters long!");
                isValid = false;
            }
            if (confirmPassword.trim() === '') {
                setConfirmPasswordError("Confirm Password is required!");
                isValid = false;
            } else if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match!");
                isValid = false;
            }

            return isValid;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validate()) {
                return;
            }

            const data = {
                firstName,
                phone,
                email,
                password
            };

            try {
                const res = await registerUserApi(data);
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error("Network Error: Unable to register");
                console.error("Registration Error:", error);
            }
        };

        return (
            <div className="register-container">
                <div className="image-container">
                    <img
                        src={"/assets/images/pele.png"}
                        alt="Registration illustration"
                        className="register-image"
                    />
                </div>
                <div className="register-box">
                    <h2>Sign Up</h2>
                    <p>Create your account to get started</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" value={firstName} onChange={handleFirstName} placeholder="Full Name" />
                            {firstNameError && <p className="error-text">{firstNameError}</p>}
                        </div>
                        <div className="input-group">
                            <input type="text" value={phone} onChange={handlePhone} placeholder="Phone Number" />
                            {phoneError && <p className="error-text">{phoneError}</p>}
                        </div>
                        <div className="input-group">
                            <input type="text" value={email} onChange={handleEmail} placeholder="Email" />
                            {emailError && <p className="error-text">{emailError}</p>}
                        </div>
                        <div className="input-group">
                            <input type="password" value={password} onChange={handlePassword} placeholder="Password" />
                            {passwordError && <p className="error-text">{passwordError}</p>}
                        </div>
                        <div className="input-group">
                            <input type="password" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm Password" />
                            {confirmPasswordError && <p className="error-text">{confirmPasswordError}</p>}
                        </div>
                        <button type="submit" className="register-button">Sign Up</button>
                    </form>
                    <p>Already have an account? <a href="/login" className="login-link">Login</a></p>
                </div>
            </div>
        );
    };

    export default Register;
