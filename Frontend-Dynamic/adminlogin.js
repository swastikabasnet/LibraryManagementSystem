async function login(unamefieldid,passwordfieldid,formid,users){
    const uname = document.querySelector(unamefieldid);
    const password = document.querySelector(passwordfieldid);
    const form = document.querySelector(formid);


    form.addEventListener('submit',function(event){
        event.preventDefault();
        
        console.log(uname.value);
        console.log(password.value);

        const user = users.find(function(currentuser){
            return currentuser.uname === uname.value && currentuser.password === password.value;
            
        });
        console.log(user);
        if(user){
            localStorage.setItem("user",JSON.stringify(user));
            window.location.pathname = "../Frontend-Static/SajanKumarShrestha/AdminDashboard/HTML/Dashboard.html";
        }
        else{
            alert("use corrrect user");
        }

    });
}
// connection to database
async function getusers(){
    const response = await fetch("http://localhost:3000/admin")
    return response.json();
}
// Checking the data from form to database
async function main(){
    const users = await getusers();
    login("#uname","#password","#admin-login-form",users);
}
main();