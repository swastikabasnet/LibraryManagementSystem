async function login(emailfieldid,passwordfieldid,formid,users){
    const email = document.querySelector(emailfieldid);
    const password = document.querySelector(passwordfieldid);
    const form = document.querySelector(formid);


    form.addEventListener('submit',function(event){
        event.preventDefault();
        
        console.log(email.value);
        console.log(password.value);

        const user = users.find(function(currentuser){
            return currentuser.email === email.value && currentuser.password === password.value;
            
        });
        console.log(user);
        if(user){
            localStorage.setItem("user",JSON.stringify(user));
            window.location.pathname = "../Frontend-Static/SajanKumarShrestha/UserDasboard/HTML/UserDashboard.html";
        }
        else{
            alert("use corrrect user");
        }

    });
}
// connection to database
async function getusers(){
    const response = await fetch("http://localhost:3000/users")
    return response.json();
}
// Checking the data from form to database
async function main(){
    const users = await getusers();
    login("#email","#password","#login-form",users);
}
main();
