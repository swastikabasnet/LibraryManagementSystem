// import "../../styles/MyAccount.css";
// import "../../UserDashboardcss/MyAccount.css"

import axios from "axios";
import { useEffect, useState } from "react";

function MyAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // admin update

    return (
        <div class="main">
            <div class="form">
                <h2>My Account</h2>
                <form>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputEmailAddress">Email address</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                    </div>
                    <div class="mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputPhone">Password</label>
                            <input class="form-control" id="inputPhone" type="password" placeholder="Enter your password" value="555-123-4567" />
                        </div>
                    </div>
                    <button class="btn btn-primary" type="button">Save changes</button>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;