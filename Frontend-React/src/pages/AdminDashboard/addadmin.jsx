
import { useState } from "react";


function AddAdmin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    return (
        <div class="row">
            <h1>Add Admin</h1>
            <div class="form-group">
                <input type="Email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" id="pwd" name="pwd" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                <button type="button" onClick="">Add</button>
                {errorMsg && (
                    <h4 className="error-message" style={{ color: "red", marginTop: "10px" }}>
                        {errorMsg}
                    </h4>
                )}
            </div>
        </div>
    );
}

export default AddAdmin;