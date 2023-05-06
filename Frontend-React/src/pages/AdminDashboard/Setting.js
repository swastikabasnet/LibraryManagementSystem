// import "../../styles/MyAccount.css";
// import "../../UserDashboardcss/MyAccount.css"

function MyAccount() {
    return (
        <div class="main">
            <div class="form">
                <h2>My Account</h2>
                <form>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                        <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username" />
                    </div>
                    <div class="mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputFirstName">First name</label>
                            <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie" />
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputLastName">Last name</label>
                            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputEmailAddress">Email address</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                    </div>
                    <div class="mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputPhone">Phone number</label>
                            <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567" />
                        </div>
                    </div>
                    <button class="btn btn-primary" type="button">Save changes</button>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;