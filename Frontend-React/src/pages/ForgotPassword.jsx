import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../styles/images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/forgot-password.module.css";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const confirmEmail = () => {
    axios
      .post("http://localhost:8080/users/send_otp", {
        email: email,
      })
      .then((data) => {
        // handle the response from the server
        sessionStorage.setItem('email', email);
        console.log(data);
        navigate("/verify_otp");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Verification error");
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    confirmEmail()
  }
  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <nav>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="App Logo" />
            </Link>
            <h1>Hamro Library</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>
        <form onSubmit={handleSubmit} className={styles.form} action="">
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Enter your registered email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid email address")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button class="btn" type="submit">
            Send Otp code
          </button>
        </form>
      </main>
    </>
  );
}

export default ForgotPassword;