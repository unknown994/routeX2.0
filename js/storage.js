const Storage={

getUsers(){
return JSON.parse(localStorage.getItem("users"))||[];
},

saveUser(user){
const users=this.getUsers();
users.push(user);
localStorage.setItem("users",JSON.stringify(users));
},

findUser(email,password){
return this.getUsers().find(
u=>u.email===email && u.password===password
);
},

saveMap(map){
localStorage.setItem("map",map);
},

getMap(){
return localStorage.getItem("map");
},

saveLocations(locations){
localStorage.setItem("locations",JSON.stringify(locations));
},

getLocations(){
return JSON.parse(localStorage.getItem("locations"))||[];
}

}