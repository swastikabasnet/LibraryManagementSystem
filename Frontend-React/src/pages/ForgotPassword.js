import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../styles/images/logo.png';
import axios from 'axios';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const confirmEmail = () => {
        axios.post("http://localhost:8080/Users/send_otp", {
            "email": email
        })
            .then(data => {
                // handle the response from the server
                console.log(data);
                navigate("/verify_otp");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            <div class="flex-container">
                <img src={logo} />
                <h2>Hamro Library</h2>
            </div>
            <div class="row">
                <h1>Forgot Password</h1>
                <div class="form-group">
                    <input type="email" placeholder="Enter your registered email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required
                        onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <button class="btn" type="submit" onClick={() => confirmEmail()}>Send Otp code</button>
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;