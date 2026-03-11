const Auth = {

storageKeyUsers: "routeX_users",
storageKeySession: "routeX_session",

/* ---------- Simple Hash (demo level) ---------- */

hash(password){

return btoa(password.split("").reverse().join(""));

},

/* ---------- User Storage ---------- */

getUsers(){

try{

const data = localStorage.getItem(this.storageKeyUsers);

return data ? JSON.parse(data) : [];

}catch{

return [];

}

},

saveUsers(users){

localStorage.setItem(
this.storageKeyUsers,
JSON.stringify(users)
);

},

/* ---------- Register ---------- */

register(username,password){

username = username.trim().toLowerCase();

if(!username || !password){

return {success:false,msg:"All fields are required"};

}

if(username.length < 3){

return {success:false,msg:"Username must be at least 3 characters"};

}

/* Username validation */

const usernameRegex = /^[a-z0-9_]+$/;

if(!usernameRegex.test(username)){

return {
success:false,
msg:"Username can only contain letters, numbers, and _"
};

}

if(password.length < 6){

return {success:false,msg:"Password must be at least 6 characters"};

}

const users = this.getUsers();

/* Check duplicates */

if(users.some(u=>u.username===username)){

return {success:false,msg:"Username already exists"};

}

/* Create user */

const newUser = {

username:username,
password:this.hash(password),
role:"user"

};

users.push(newUser);

this.saveUsers(users);

return {success:true,msg:"Registration successful"};

},

/* ---------- Login ---------- */

login(username,password){

username = username.trim().toLowerCase();

const users = this.getUsers();

const hashed = this.hash(password);

const user = users.find(

u => u.username===username && u.password===hashed

);

if(!user){

return {success:false,msg:"Invalid username or password"};

}

const session = {

username:user.username,
role:user.role,
loginTime:Date.now()

};

localStorage.setItem(

this.storageKeySession,
JSON.stringify(session)

);

return {success:true};

},

/* ---------- Logout ---------- */

logout(){

localStorage.removeItem(this.storageKeySession);

window.location.href="index.html";

},

/* ---------- Current User ---------- */

getCurrentUser(){

try{

const session = JSON.parse(

localStorage.getItem(this.storageKeySession)

);

if(!session) return null;

/* 12 hour expiry */

const maxAge = 12*60*60*1000;

if(Date.now()-session.loginTime > maxAge){

this.logout();

return null;

}

return session;

}catch{

return null;

}

},

/* ---------- Auth Check ---------- */

isAuthenticated(){

return this.getCurrentUser() !== null;

}

};