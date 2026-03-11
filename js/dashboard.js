const Dashboard = {

init(){

if(!Auth.isAuthenticated()){
window.location.href="login.html";
return;
}

this.loadUser();
this.loadQR();
this.loadStats();

},

/* ---------- User Info ---------- */

loadUser(){

const user=Auth.getCurrentUser();

const userNameElement=document.getElementById("user-name");

if(user && userNameElement){

userNameElement.textContent=user.username;

}

},

/* ---------- QR Code ---------- */

loadQR(){

const qrContainer=document.getElementById("qr-scan-area");

if(!qrContainer) return;

const qrData=Storage.getQR();

if(!qrData){

qrContainer.innerHTML=
'<p style="color:var(--text-light)">No QR code generated yet.</p>';

return;

}

qrContainer.innerHTML="";

try{

new QRCode(qrContainer,{
text:qrData,
width:200,
height:200,
colorDark:"#000000",
colorLight:"#ffffff",
correctLevel:QRCode.CorrectLevel.H
});

}catch(e){

console.error("QR generation failed",e);

qrContainer.innerHTML=
'<p style="color:red">QR Code could not be generated.</p>';

}

},

/* ---------- Stats ---------- */

loadStats(){

const locations=Storage.getLocations();

const totalLocsEl=document.getElementById("total-locations");

if(totalLocsEl){

totalLocsEl.textContent=locations.length;

}

/* Path calculation stats */

const pathCountEl=document.getElementById("path-count");

let pathCount=localStorage.getItem("routeX_path_count") || 0;

if(pathCountEl){

pathCountEl.textContent=pathCount;

}

},

/* ---------- Increase Path Counter ---------- */

increasePathCount(){

let count=parseInt(localStorage.getItem("routeX_path_count") || 0);

count++;

localStorage.setItem("routeX_path_count",count);

}

};


/* Initialize Dashboard */

document.addEventListener("DOMContentLoaded",()=>{

Dashboard.init();

});