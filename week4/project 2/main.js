var noiseScale = 0.005;
var repulsionRadius = 100;
var imgNames = ["cairo.jpg", "la.jpg"]; 

var imgs = [];
var imgIndex = -1;
var particles = [];
var seed = 0;


function preload() {
	for (let i = 0; i < imgNames.length; i++) {
		imgs.push(loadImage(imgNames[i]));
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	changeImage();
}


function draw() {
	if (mouseIsPressed && mouseButton == RIGHT) {
		background(255);
	}
	
	let img = imgs[imgIndex];

	
	let rad = 100;
	let speed = 0.02;
	let x = 20;
	let y = abs(sin(frameCount * 0.01)) * img.height;
	particles.push(new Particle(x, y));

	for (let i = particles.length - 1; i > -1 ; i--) {
		particles[i].move();
		particles[i].display();
		
		if (particles[i].outOfBounds()) {
			particles.splice(i, 1);
		}
	}
	
	if (frameCount % 100 == 0) {
		seed++;
	}
}


function changeImage() {
	background(255);

	imgIndex++;
	if (imgIndex >= imgNames.length) {
		imgIndex = 0;
	}

	imgs[imgIndex].loadPixels();
}


function mousePressed() {
	if (mouseButton == LEFT) {
		changeImage();
	}
}