let posX, posY
let velX, velY
let cRadius = 40 


function setup() {
createCanvas(800, 600);

posX = width/2 
posY = height/2

velX = -2.5
velY = 3.2

}

function draw() {
background(220);

posX += velX
posY += velY

if(posY+cRadius >= height || posY-cRadius <=0){
    velY *= -1;
}
if(posX-cRadius <= 0 || posX+cRadius >= width){
    velX *= -1
}

fill(127, 255, 127)
circle(posX, posY, cRadius * 2)
}