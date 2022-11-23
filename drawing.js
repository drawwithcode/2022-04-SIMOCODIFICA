//this is the code for a drawing app for kids, based on touch and sensors interactions in p5.js

let slider;
let thicknesstxt;
let redtxt, greentxt, bluetxt;
let RED, GREEN, BLUE; //variables to cotrol RGB color
let thickness;
let pixels = []; //array of pixels
let artwork;
let saveButton;
let FT88r, FT88b, FT88i; //variables for fonts
let myColor;
let num1 = 0;
let num2 = 0;

//uploading fonts
function preload() {
  FT88r = loadFont("./assets/FT88-Regular.ttf");
  FT88b = loadFont("./assets/FT88-Bold.ttf");
  FT88i = loadFont("./assets/FT88-School.ttf");
}

function setup() {
  //here I'm creating the first slider, to control pixels' thickness
  slider = createSlider(0, 30, 10, 1);
  slider.addClass("sliders");
  slider.position(windowWidth / 2 - 150, 40);
  slider.size(100, 2);
  slider.style("appearance", "none");
  slider.style("background", "#000000");
  slider.style("outline", "none");
  slider.style("border-radius", "2px");
  thicknesstxt = createDiv("Thickness");
  thicknesstxt.position(windowWidth / 2 - 150, 20);
  thicknesstxt.style("font-family", "FT88");

  //slider to control RGB's red channel
  RED = createSlider(0, 255, 0, 1);
  RED.position(windowWidth / 2, 40);
  RED.size(100, 2);
  RED.style("appearance", "none");
  RED.style("background", "#000000");
  RED.style("outline", "none");
  // RED.style("border-radius", "2px");
  redtxt = createDiv("Red Value");
  redtxt.position(windowWidth / 2, 20);
  redtxt.style("font-family", "FT88");

  //slider to control RGB's green channel
  GREEN = createSlider(0, 255, 0, 1);
  GREEN.position(windowWidth / 2 - 150, 80);
  GREEN.size(100, 2);
  GREEN.style("appearance", "none");
  GREEN.style("background", "#000000");
  GREEN.style("outline", "none");
  // GREEN.style("border-radius", "2px");
  greentxt = createDiv("Green Value");
  greentxt.position(windowWidth / 2 - 150, 60);
  greentxt.style("font-family", "FT88");

  //slider to control RGB's blue channel
  BLUE = createSlider(0, 255, 0, 1);
  BLUE.position(windowWidth / 2, 80);
  BLUE.size(100, 2);
  BLUE.style("appearance", "none");
  BLUE.style("background", "#000000");
  BLUE.style("color", "#000000");
  BLUE.style("outline", "none");
  //BLUE.style("border-radius", "2px");
  bluetxt = createDiv("Blue Value");
  bluetxt.position(windowWidth / 2, 60);
  bluetxt.style("font-family", "FT88");

  createCanvas(windowWidth, windowHeight);
  setMoveThreshold(2);
  background(220);
  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(windowWidth / 2, 60, (7 * windowWidth) / 8, 100);
  setShakeThreshold(100);
  noStroke();
  fill(0);

  //button to save the artwork as a png file
  saveButton = createButton("SAVE ARTWORK");
  saveButton.addClass("buttons");
  saveButton.style("font-family", "FT88");
  saveButton.style("font-size", "16px");
  saveButton.style("color", "black");
  saveButton.style("background-color", "255");
  //saveButton.style("border-radius", "10px");
  saveButton.style("border", "0px");
  //saveButton.style("border-color:", "black");
  saveButton.style("padding", "6px 10px");
  saveButton.position(windowWidth / 3, (19 * windowHeight) / 20);
  saveButton.style("background-color", "#ef8e34");
  saveButton.style("color", "220");
  saveButton.mousePressed(saveArtwork); //callback function to call "saveArtwork" function when the button is touched
}

function draw() {
  //display class' elements
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].display();
  }
}

//class for the pixel's creation
class Pixel {
  constructor(px, py, pcolor, pthickness) {
    this.x = px;
    this.y = py;
    this.color = pcolor;
    this.thickness = pthickness;
  }

  display() {
    push();
    noStroke();
    fill(this.color);
    square(this.x, this.y, this.thickness);
    pop();
  }

  //randomized movement when user move the phone
  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  //movement based on X axis' inclination, with random to make it more interesting
  moveX() {
    num1 = random([-1, 1]);
    if (num1 == 1) {
      this.x += rotationX / 5;
      this.y += rotationX / 5;
    } else {
      this.x -= rotationX / 5;
      this.y -= rotationX / 5;
    }
  }

  //same for Y axis
  moveY() {
    num2 = random([-1, 1]);
    if (num2 == 1) {
      this.x += rotationY / 2;
      this.y += rotationY / 2;
    } else {
      this.x -= rotationY / 2;
      this.y -= rotationY / 2;
    }
  }
}

//when the user touch the screen, a new istance of Pixel class is created
function touchStarted() {
  for (let i = 0; i < touches.length; i++) {
    let x1 = touches[i].x;
    let y1 = touches[i].y;
    myColor = color(RED.value(), GREEN.value(), BLUE.value());
    thickness = slider.value();

    //check the touch y to avoid drawing in the sliders part
    if (y1 > 150) {
      pixels.push(new Pixel(x1, y1, myColor, thickness));
    }
  }
}

//the same when touch is moved, to allow a continuous drawing
function touchMoved() {
  for (let i = 0; i < touches.length; i++) {
    let x1 = touches[i].x;
    let y1 = touches[i].y;
    myColor = color(RED.value(), GREEN.value(), BLUE.value());
    thickness = slider.value();

    //check the touch y to avoid drawing in the sliders part
    if (y1 > 150) {
      pixels.push(new Pixel(x1, y1, myColor, thickness));
    }
  }
  return false;
}

//function that get the artwork and save it as a png
function saveArtwork() {
  artwork = get(0, 150, width, height - 150);
  artwork.save();
}

//when device is shaken, sketch is cleared
function deviceShaken() {
  background(220);
  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(windowWidth / 2, 60, (7 * windowWidth) / 8, 100);
  pixels = [];
}

//when the device is turned, a different function is called based on the axis inclination
function deviceTurned() {
  if (turnAxis === "X") {
    //background("#9ee493");
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].moveX();
    }
  }
  if (turnAxis === "Y") {
    //background("#6369d1");
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].moveY();
    }
  }
  if (turnAxis === "Z") {
    //background("#E2725B");
  }
}

function deviceMoved() {
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].move();
  }
}

//permission request
function touchEnded(event) {
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}
