const mapImage = document.getElementById("mapImage")
const mapContainer = document.getElementById("mapContainer")
const uploadInput = document.getElementById("mapUpload")

let locations = JSON.parse(localStorage.getItem("locations")) || []

/* LOAD SAVED MAP */

const savedMap = localStorage.getItem("routex_map")

if(savedMap){
mapImage.src = savedMap
}

/* UPLOAD NEW MAP */

if(uploadInput){

uploadInput.addEventListener("change", function(e){

const file = e.target.files[0]

if(!file) return

const reader = new FileReader()

reader.onload = function(event){

const imageData = event.target.result

localStorage.setItem("routex_map", imageData)

mapImage.src = imageData

}

reader.readAsDataURL(file)

})

}

/* RENDER MARKERS */

function renderLocations(){

document.querySelectorAll(".marker").forEach(marker => marker.remove())

locations.forEach(loc => {

const marker = document.createElement("div")

marker.className = "marker"

marker.style.left = loc.x + "px"
marker.style.top = loc.y + "px"

marker.title = loc.name

mapContainer.appendChild(marker)

})

}

/* ADD NEW LOCATION */

mapContainer.addEventListener("click", function(e){

const rect = mapContainer.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const name = prompt("Enter location name")

if(!name) return

const location = {name, x, y}

locations.push(location)

localStorage.setItem("locations", JSON.stringify(locations))

renderLocations()

})

renderLocations()