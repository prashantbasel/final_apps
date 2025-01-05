
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUserApi } from "../../apis/Api";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const validation = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (email.trim() === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError("Password is empty");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }

    const data = {
      email,
      password,
    };

    loginUserApi(data).then((res) => {
      if (res.data.sucess === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem('user', convertedData);

        if (res.data.userData.isAdmin) {
          navigate('/admin/dashboard');
        } else if (!res.data.userData.isAdmin) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgot_password");
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={"/assets/images/pele.png"} alt="Login Illustration" />
      </div>
      <div className="login-box">
        <h2>Welcome back</h2>
        <p>Please enter your details</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="forgot-password-container">
          <button
            type="button"
            className="forgot-password-button"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        <p>
          Don’t have any account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
  
};

export default Login;
