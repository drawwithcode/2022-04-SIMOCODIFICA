let FT88r, FT88b, FT66i;
let start;
let instructions;
let intro;

function preload() {
  FT88r = loadFont("./assets/FT88-Regular.ttf");
  FT88b = loadFont("./assets/FT88-Bold.ttf");
  FT88i = loadFont("./assets/FT88-School.ttf");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  // here I create a button that allows to change sketch
  start = createButton("START");
  start.mousePressed(changePage);
  start.size(100, 35);
  start.style("background-color", "#ef8e34");
  //start.style("border-radius", "50px");
  start.style("border", "0px");
  start.position(windowWidth / 2 - 50, (7 * windowHeight) / 8);
  start.style("font-family", "FT88");
  start.style("font-size", "16px");
  start.style("color", "220");
}

// this is the function that allows the sketch change
function changePage() {
  window.open("drawing.html", "_self");
}

function draw() {
  background("black");
  textFont(FT88i);
  fill("white");
  textSize(24);
  intro = "Hi kid!";
  instructions =
    "Touch the screen to create pixels,\nchange color and dimension using the sliders,\nmove your phone to generate pixels' diffusion\n and shake the phone to clear the sketch";
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(32);
  text(intro, windowWidth / 2, windowHeight / 8);
  textFont(FT88b);
  textSize(26);
  text(instructions, windowWidth / 2, windowHeight / 2, 350, 350);
}
