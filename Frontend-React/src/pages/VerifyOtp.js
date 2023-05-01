import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../styles/images/logo.png';
import axios from 'axios';

function VerifyOtp() {

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const otpConfirmation = () => {
        axios.post("http://localhost:8080/Users/verify_otp", null, {
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
        <div>
            <div class="flex-container">
                <img src={logo} alt='logo' />
                <h2>Hamro Library</h2>
            </div>
            <div class="row">
                <h1>Validate OTP</h1>
                <h6 class="information-text">Please enter the otp sent in your email</h6>
                <div class="form-group">
                    <input type="OTP" placeholder="Enter your OTP here" onChange={(e) => { setOtp(e.target.value) }} />
                    <button><a class="btn" onClick={() => otpConfirmation()}>Confirm Otp</a></button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;