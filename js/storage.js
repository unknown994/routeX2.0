const Storage = {

keys: {
blueprint: "routeX_blueprint",
locations: "routeX_locations",
qr: "routeX_qr"
},

/* ---------- Blueprint ---------- */

saveBlueprint(imageData){

if(!imageData){
console.warn("Blueprint image missing");
return false;
}

try{

localStorage.setItem(this.keys.blueprint,imageData);
return true;

}catch(e){

alert("Image too large for LocalStorage. Please upload a smaller blueprint.");
return false;

}

},

getBlueprint(){

return localStorage.getItem(this.keys.blueprint);

},

/* ---------- Locations ---------- */

saveLocations(locations){

if(!Array.isArray(locations)){
console.warn("Invalid locations format");
return;
}

localStorage.setItem(
this.keys.locations,
JSON.stringify(locations)
);

},

getLocations(){

try{

const data=localStorage.getItem(this.keys.locations);

return data ? JSON.parse(data) : [];

}catch(e){

console.warn("Locations data corrupted");
return [];

}

},

/* ---------- QR Data ---------- */

saveQR(qrData){

if(!qrData){
console.warn("QR data missing");
return;
}

localStorage.setItem(this.keys.qr,qrData);

},

getQR(){

return localStorage.getItem(this.keys.qr);

},

/* ---------- Utilities ---------- */

clearData(){

localStorage.removeItem(this.keys.blueprint);
localStorage.removeItem(this.keys.locations);
localStorage.removeItem(this.keys.qr);

},

hasMapData(){

return !!(
this.getBlueprint() &&
this.getLocations().length
);

}

};