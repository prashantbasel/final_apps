import React, { useState } from "react";
import { toast } from "react-toastify";
import { ForgetPasswordApi, verifyOtpApi } from "../../apis/Api";
import "./ForgotPassword.css"; // Import the CSS file for custom styling

export const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // send otp function
  const handleSendOtp = (e) => {
    e.preventDefault();
    // api call
    ForgetPasswordApi({ phone })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  // verify otp and set new password
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const data = {
      phone: phone,
      otp: otp,
      newPassword: newPassword,
    };
    // api call
    verifyOtpApi(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h3>Change Password</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">+977</span>
                </div>
                <input
                   disabled={isSent}
                                 onChange={(e) => setPhone(e.target.value)}
                                 type=""
                                
                                 placeholder="Enter Mobile number"
                />
              </div>
            </div>
            <button
              disabled={isSent}
              onClick={handleSendOtp}
              className="btn btn-dark mt-3 w-100"
            >
              Send OTP
            </button>
            {isSent && (
              <>
                <hr />
                <p className="text-success text-center">
                  OTP has been sent to {phone} ✅
                </p>
                <div className="form-group mt-3">
                  <label htmlFor="otp">OTP</label>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Enter valid OTP"
                    id="otp"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    id="newPassword"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="btn btn-primary mt-3 w-100"
                >
                  Reset Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
