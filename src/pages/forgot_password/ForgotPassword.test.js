import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { toast } from "react-toastify";
import { ForgetPasswordApi, verifyOtpApi } from "../../apis/Api";
import { ForgotPassword } from "./ForgotPassword";

jest.mock("../../apis/Api", () => ({
    ForgetPasswordApi: jest.fn(),
    verifyOtpApi: jest.fn()
}));

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));

describe("ForgotPassword Component Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly initially", () => {
        render(<ForgotPassword />);
        expect(screen.getByPlaceholderText("Enter Mobile number")).toBeInTheDocument();
        expect(screen.getByText("Send OTP")).toBeEnabled();
    });

    it("accepts input for mobile number", () => {
        render(<ForgotPassword />);
        fireEvent.change(screen.getByPlaceholderText("Enter Mobile number"), { target: { value: "1234567890" } });
        expect(screen.getByPlaceholderText("Enter Mobile number").value).toBe("1234567890");
    });

    it("calls API on send OTP and receives success", async () => {
        ForgetPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
        render(<ForgotPassword />);
        fireEvent.change(screen.getByPlaceholderText("Enter Mobile number"), { target: { value: "1234567890" } });
        fireEvent.click(screen.getByText("Send OTP"));
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("OTP sent successfully");
        });
    });

    it("shows OTP sent message on successful API call", async () => {
        ForgetPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
        render(<ForgotPassword />);
        fireEvent.click(screen.getByText("Send OTP"));
        await waitFor(() => {
            expect(screen.getByText(/OTP has been sent to/)).toBeInTheDocument();
        });
    });

    it("enables OTP input after successful OTP send", async () => {
        ForgetPasswordApi.mockResolvedValue({ status: 200, data: { message: "OTP sent successfully" } });
        render(<ForgotPassword />);
        fireEvent.click(screen.getByText("Send OTP"));
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Enter valid OTP")).not.toBeDisabled();
        });
    });

    it("displays error toast when API call fails on sending OTP", async () => {
        ForgetPasswordApi.mockRejectedValue({
            response: { status: 500, data: { message: "Failed to send OTP" } }
        });
        render(<ForgotPassword />);
        fireEvent.click(screen.getByText("Send OTP"));
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Failed to send OTP");
        });
    });



    it("displays error toast when password reset fails", async () => {
        verifyOtpApi.mockRejectedValue({
            response: { status: 400, data: { message: "Invalid OTP" } }
        });
        render(<ForgotPassword />);
        fireEvent.click(screen.getByText("Reset Password"));
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Invalid OTP");
        });
    });



});
