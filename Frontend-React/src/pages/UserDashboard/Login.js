import "../../styles/login.css";
import logo from '../../styles/images/logo.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";
import { Link, Route, Routes } from 'react-router-dom';

function Login() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const [logEmail, setlogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const navigate = useNavigate();

    const login = async (event) => {
        var requestBody = { "email": logEmail, "password": logPassword }
        await axios.post("http://localhost:8080/login", requestBody).then(response => {
            navigate("/dashboard", { state: response.data })
        })
    }

    const register = async (event) => {
        var requestBody = { "name": name, "phoneNumber": phoneNumber, "email": regEmail, "password": regPassword }
        await axios.post("http://localhost:8080/register", requestBody).then(response => {
            navigate("/dashboard", { state: response.data })
        })
    }

    return (
        <div class="login-Body">
            <div class="topnav">
                <a class="active" href="home.html">Home</a>
                <a href="#news">SignIn</a>
            </div>
            <div class="flex-container">
                <img src={logo} alt="" />
                <h1 class="title">Welcome to Hamro Library</h1>
            </div>

            <div class={`container ${isRegistering && "right-panel-active"}`} id="container">
                <div class="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>

                        <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                        <input type="phone number" placeholder="Phone number" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        <input type="email" placeholder="Email" onChange={(e) => { setRegEmail(e.target.value) }} />
                        <input type="password" placeholder="Password" onChange={(e) => { setRegPassword(e.target.value) }} />
                        <input type="password" placeholder="Re-enter password" onChange={(e) => { setReEnterPassword(e.target.value) }} />
                        <button type="button" onClick={register}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" onChange={(e) => { setlogEmail(e.target.value) }} />
                        <input type="password" placeholder="Password" onChange={(e) => { setLogPassword(e.target.value) }} />
                        <div class="forgot">
                            <Link to="/forgotpassword" style={{ color: "blue" }}>Forgot password?</Link>
                        </div>
                        <div class="check">
                            <input type="checkbox" checked={rememberMe} name="remember" />
                            <div style={{ margin: '20px', fontSize: '14px' }}>
                                Remember Me
                            </div>
                        </div>
                        <button style={{ margin: '20px' }} type="button" onClick={login} >Sign In</button>


                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" id="signIn" onClick={() => { setIsRegistering(false) }}>Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Don't have account?</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" id="signUp" onClick={() => { setIsRegistering(true) }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/forgotpassowrd' element={<ForgotPassword />} />
            </Routes>
        </div>
    );
}
export default Login;