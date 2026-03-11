const Admin = {

init(){

if(!Auth.isAuthenticated()){
window.location.href="login.html";
return;
}

const user=Auth.getCurrentUser();

if(user.role!=="admin"){
alert("Access denied");
window.location.href="dashboard.html";
return;
}

this.bindEvents();
this.renderLocationList();
this.loadBlueprintPreview();

},

/* ---------- Event Binding ---------- */

bindEvents(){

const fileInput=document.getElementById("blueprint-upload");
const addLocBtn=document.getElementById("add-location-btn");
const qrBtn=document.getElementById("generate-qr-btn");

if(fileInput){
fileInput.addEventListener("change",(e)=>this.uploadBlueprint(e));
}

if(addLocBtn){
addLocBtn.addEventListener("click",()=>this.addLocation());
}

if(qrBtn){
qrBtn.addEventListener("click",()=>this.generateQR());
}

},

/* ---------- Blueprint Upload ---------- */

uploadBlueprint(e){

const file=e.target.files[0];

if(!file) return;

/* Validate file type */

const allowed=["image/png","image/jpeg"];

if(!allowed.includes(file.type)){
alert("Only PNG or JPG images are allowed.");
return;
}

/* Validate size (2MB max) */

if(file.size>2*1024*1024){
alert("Image too large. Please upload under 2MB.");
return;
}

const reader=new FileReader();

reader.onload=(event)=>{

if(Storage.saveBlueprint(event.target.result)){

alert("Blueprint uploaded successfully!");
this.loadBlueprintPreview();

}

};

reader.readAsDataURL(file);

},

/* ---------- Blueprint Preview ---------- */

loadBlueprintPreview(){

const preview=document.getElementById("blueprint-preview");
const blueprint=Storage.getBlueprint();

if(preview && blueprint){

preview.innerHTML=
`<img src="${blueprint}" style="max-width:100%;border-radius:6px;margin-top:10px;">`;

}

},

/* ---------- Add Location ---------- */

addLocation(){

const name=prompt("Enter Location Name (e.g., Cafeteria):");

if(!name || name.trim()==="") return;

const newLoc={
id:Date.now(),
name:name.trim(),
x:Math.floor(Math.random()*80)+10,
y:Math.floor(Math.random()*80)+10
};

const locs=Storage.getLocations();

locs.push(newLoc);

Storage.saveLocations(locs);

this.renderLocationList();

alert(`Location "${newLoc.name}" added.`);

},

/* ---------- Render Locations ---------- */

renderLocationList(){

const locList=document.getElementById("location-list");

if(!locList) return;

const locs=Storage.getLocations();

if(locs.length===0){

locList.innerHTML="<li>No locations added yet.</li>";

return;

}

locList.innerHTML=locs.map(loc=>
`<li>${loc.name} (${loc.x}, ${loc.y})</li>`
).join("");

},

/* ---------- Generate QR ---------- */

generateQR(){

const blueprint=Storage.getBlueprint();

if(!blueprint){
alert("Please upload a blueprint first.");
return;
}

const locations=Storage.getLocations();

const qrData=JSON.stringify({
blueprint,
locations
});

Storage.saveQR(qrData);

const qrContainer=document.getElementById("qr-display");

if(!qrContainer) return;

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
qrContainer.innerHTML="<p style='color:red'>QR generation failed.</p>";

}

}

};


/* Initialize */

document.addEventListener("DOMContentLoaded",()=>{

Admin.init();

});