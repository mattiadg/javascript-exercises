// Global variables 
const initNumFaces = 5;
var numFaces = initNumFaces;
var facesAddedOnNextLevel = 5;
var level = 1;
var leftSide, rightSide, body, levelSpan, numFacesSpan;
var imgPath = "smile.png";
var sideSize = 500; // in pixels
var faceSize = 80;  // in pixels
var maxCoor = sideSize - faceSize;  // max value for a coordinate


// On DOM load, get a reference to the two side and generate the faces
document.addEventListener("DOMContentLoaded", function (event) {
  leftSide = document.getElementById("leftSide");
  rightSide = document.getElementById("rightSide");
  
  levelSpan = document.getElementById("level");
  numFacesSpan = document.getElementById("numFaces");
  
  body = document.getElementsByTagName("body")[0];
  // When anything different from the right face is clicked, game over
  body.addEventListener("click", gameOver);
  
  newGame();
});


// Functions 
// Generate the faces on both the sides
function newGame() {
  levelSpan.textContent = level;
  numFacesSpan.textContent = numFaces;
  
  for (var i=0; i<numFaces; i++) {
    img = document.createElement("img");
    img.src = imgPath;
    img.width = faceSize;
    img.className = "faceImg";
    img.style.top = (Math.random() * maxCoor) + "px";
    img.style.left = (Math.random() * maxCoor) + "px";
    leftSide.appendChild(img);
  }
  // Copy all the faces on the right side removing only the last face
  var leftSideCopy = leftSide.cloneNode(true);
  leftSideCopy.removeChild(leftSideCopy.lastChild);
  rightSide.appendChild(leftSideCopy);
  
  // Go to the next level when the last face is clicked
  leftSide.lastChild.addEventListener("click", nextLevel); 
}

function nextLevel(event) {
  numFaces += facesAddedOnNextLevel;
  event.stopPropagation();
  clearFaces();
  level++;
  newGame();
} 

function clearFaces() {
  removeAllChildren(leftSide);
  removeAllChildren(rightSide);
}

function removeAllChildren (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function gameOver() {
    alert("Game Over!");
    level = 1;
    numFaces = initNumFaces;
    clearFaces();
    newGame();
};



