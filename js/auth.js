const registerForm=document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",e=>{

e.preventDefault();

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

Storage.saveUser({name,email,password});

alert("Account created");

window.location="login.html";

});
}

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",e=>{

e.preventDefault();

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const user=Storage.findUser(email,password);

if(user){

localStorage.setItem("session",JSON.stringify(user));

window.location="admin.html";

}else{

alert("Invalid login");

}

});
}