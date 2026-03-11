const MapEngine = {

canvas:null,
ctx:null,

blueprint:null,
locations:[],
path:[],

scale:1,
offsetX:0,
offsetY:0,

init(canvasId){

this.canvas=document.getElementById(canvasId)
this.ctx=this.canvas.getContext("2d")

this.resize()

window.addEventListener("resize",()=>{
this.resize()
this.draw()
})

},

resize(){

const container=this.canvas.parentElement

this.canvas.width=container.clientWidth
this.canvas.height=container.clientHeight

},

loadMap(blueprintSrc,locations){

this.locations=locations

this.blueprint=new Image()

this.blueprint.src=blueprintSrc

this.blueprint.onload=()=>{
this.calculateTransform()
this.draw()
}

},

calculateTransform(){

const w=this.canvas.width
const h=this.canvas.height

this.scale=Math.min(
w/this.blueprint.width,
h/this.blueprint.height
)

this.offsetX=(w-this.blueprint.width*this.scale)/2
this.offsetY=(h-this.blueprint.height*this.scale)/2

},

setPath(pathNodes){

this.path=pathNodes
this.draw()

},

toCanvas(node){

return{

x:this.offsetX+(node.x/100)*this.blueprint.width*this.scale,

y:this.offsetY+(node.y/100)*this.blueprint.height*this.scale

}

},

draw(){

if(!this.ctx || !this.blueprint)return

const ctx=this.ctx

ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

ctx.drawImage(

this.blueprint,

this.offsetX,
this.offsetY,

this.blueprint.width*this.scale,
this.blueprint.height*this.scale

)

this.drawPath()
this.drawLocations()

},

drawPath(){

if(this.path.length===0)return

const ctx=this.ctx

ctx.beginPath()

ctx.strokeStyle="#ef4444"
ctx.lineWidth=6
ctx.lineCap="round"

const start=this.toCanvas(this.path[0])

ctx.moveTo(start.x,start.y)

for(let i=1;i<this.path.length;i++){

const p=this.toCanvas(this.path[i])

ctx.lineTo(p.x,p.y)

}

ctx.stroke()

},

drawLocations(){

const ctx=this.ctx

this.locations.forEach(loc=>{

const p=this.toCanvas(loc)

ctx.beginPath()

ctx.arc(p.x,p.y,8,0,Math.PI*2)

ctx.fillStyle="#2563eb"

ctx.fill()

ctx.strokeStyle="#ffffff"

ctx.lineWidth=2

ctx.stroke()

ctx.fillStyle="#ffffff"

ctx.font="12px Poppins"

ctx.textAlign="center"

ctx.fillText(loc.name,p.x,p.y-14)

})

}

}