var happy;
var sad;
var stressed;
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/EWRJVNG83/';

let label = "";
let processOutcome = [];


function preload() {
  happy = loadSound("Baby.mp3")
  sad = loadSound("Avril14th.mp3")
  stressed = loadSound("Randale.mp3")
  classifier = ml5.soundClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Start classifying
  classifyAudio();
}

function classifyAudio () {
  classifier.classify(gotResults);
}

function draw() {
  background(0);
  
  noStroke();
  if(processOutcome.length > 0) {
    if(processOutcome[0].label == "Mouse")
    
    processOutcome.forEach((result, i) =>{
      switch(result.label){
        case "Background Noise":
          break;
        case "Sad":
          sad.play();
          break;
        case "Stressed":
        stressed.play();
          break;
        case "Happy":
          happy.play();
          break;
      }      
    })
  }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// When we get a result - a handler function
function gotResults(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  processOutcome = results;
  label = results[0].label;
  // Classifiy again!
  classifyAudio();
}