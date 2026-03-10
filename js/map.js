const map=document.getElementById("mapImage");

if(map){

map.src=Storage.getMap();

const locations=Storage.getLocations();

const dropdown=document.getElementById("destination");

locations.forEach(loc=>{

const option=document.createElement("option");

option.value=loc.name;

option.textContent=loc.name;

dropdown.appendChild(option);

});

locations.forEach(drawPoint);

}

function drawPoint(loc){

const point=document.createElement("div");

point.className="point";

point.style.left=loc.x+"px";
point.style.top=loc.y+"px";

map.parentElement.appendChild(point);

}