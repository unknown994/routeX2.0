const visits = JSON.parse(localStorage.getItem("visits")) || []

document.getElementById("totalRoutes").innerText = visits.length

const today = new Date().toDateString()

const todayVisits = visits.filter(v =>
new Date(v.time).toDateString() === today
)

document.getElementById("visitorsToday").innerText = todayVisits.length


const list = document.getElementById("activityList")

visits.slice(-10).reverse().forEach(v => {

const li = document.createElement("li")

li.innerText = `${v.destination} - ${new Date(v.time).toLocaleTimeString()}`

list.appendChild(li)

})