
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast"


function AddAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    // add new admin
    const register = async (event) => {
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        var requestBody = {
            email: email,
            password: password,
        };
        await axios
            .post("http://localhost:8080/admin", requestBody)
            .then((response) => {
                navigate("/admindashboard/addadmin", { state: response.data });
                toast.success("Successfully added new admin");
                window.location.reload();
            }).catch(() => toast.error("Failed to add new admin"));
    };

    return (
        <div class="main">
            <div class="row">
                <h1>Add Admin</h1>
                <div class="form-group">
                    <input type="Email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" id="pwd" name="pwd" placeholder="Confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <button type="button" onClick={register}>Add</button>
                    {errorMsg && (
                        <h4 className="error-message" style={{ color: "red", marginTop: "10px" }}>
                            {errorMsg}
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddAdmin;