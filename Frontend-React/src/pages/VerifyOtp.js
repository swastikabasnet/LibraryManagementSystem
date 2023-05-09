import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../styles/images/logo.png';
import axios from 'axios';
import "../styles/verifyotp.css";

function VerifyOtp() {

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const otpConfirmation = () => {
        axios.post("http://localhost:8080/users/verify_otp", null, {
            params: {
                otp: otp,
            },
        })
            .then(data => {
                // handle the response from the server
                console.log(data);
                navigate("/reset_password_otp");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div class="verifyotp">
            <div class="flex-container">
                <img src={logo} alt='logo' />
                <h1>Hamro Library</h1>
            </div>
            <div class="row">
                <h2>Validate OTP</h2>
                <p class="information-text">Please enter the otp sent in your email</p>
                <div class="form-group">
                    <input type="OTP" placeholder="Enter your OTP here" onChange={(e) => { setOtp(e.target.value) }} />
                    <button class="btn" onClick={otpConfirmation}>Confirm Otp</button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;