/**
 * Start by getting an html context and performing operations on that
 * Purpose is to get used to the javascript DOM.
 * @type {HTMLElement}
 */
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Get the respective widths and heights to be used
let height = ctx.canvas.height;
let width = ctx.canvas.width;
let scale = 20;

let start = new Game(height/scale);
let found = start.doPositions();
drawDirt(found["freePos"]);
drawSnake(found["snakePos"]);
drawApple(found["applePos"]);
let myVar = setInterval(progressGame, 300);
document.onkeydown = function(event) {
    switch(event.key) {
        case "ArrowLeft":
            start.moveLeft();
            event.preventDefault();
            break;
        case "ArrowRight":
            start.moveRight();
            event.preventDefault();
            break;
        case "ArrowUp":
            start.moveUp();
            event.preventDefault();
            break;
        case "ArrowDown":
            start.moveDown();
            event.preventDefault();
            break;
    }
};
let para2 = document.createElement("p");
let container = document.createElement("section");
let node = document.createTextNode("🍎 0");
para2.appendChild(node);
container.appendChild(para2);
para2.classList.add('gradient-border');
para2.id = "box";
let find = document.getElementById("start");
find.classList.add('flex-container');
find.prepend(container);

// Make a button that can be used for restarting the game
let button = document.createElement("button");
button.addEventListener("click", restart);

/**
 * A function to do a restart of the game
 */
function restart() {
    start = new Game(height/scale);
    found = start.doPositions();
    drawDirt(found["freePos"]);
    drawSnake(found["snakePos"]);
    drawApple(found["applePos"]);
    clearInterval(myVar);
    myVar = setInterval(progressGame, 300);
    const myNode = extracted();
    let newNode = document.createTextNode("🍎 0");
    myNode.appendChild(newNode);
}

// A simple restart button
let buttonText = document.createTextNode("Restart");
button.classList.add('button-restart');
button.appendChild(buttonText);
find.appendChild(button);

// Now create a header to use
let header = document.createElement("header");
let title = document.createElement("h1");
let text = document.createTextNode("🐍🐍 Snake 🐍🐍");
title.classList.add('header');
title.appendChild(text);
header.appendChild(title);
document.body.prepend(header);


/**
 * Draw some dirt on the screen.
 * Best to use pure colours to avoid file system performance issues.
 * @param freeDirt
 */
function drawDirt(freeDirt) {
    ctx.beginPath();
    for (let i = 0; i < freeDirt.length; i++) {
        let pos = freeDirt[i];
        ctx.rect(pos["x"] * scale, pos["y"] * scale, scale, scale);
        ctx.fillStyle = 'rgb(40,40,40)';
        ctx.fill();
    }
}

/**
 * Draw the snake itself, using backend information
 * @param snake as parts of a snake.
 */
function drawSnake(snake) {
    ctx.beginPath();
    for (let i = 0; i < snake.length; i++) {
        let pos = snake[i];
        ctx.rect(pos["x"] * scale, pos["y"] * scale, scale, scale);
        ctx.fillStyle = "green";
        ctx.fill();
    }
}

/**
 * Draw an apple on the screen gaining information located from the backend
 * @param loc
 */
function drawApple(loc) {
    ctx.beginPath();
    ctx.rect(loc["x"] * scale, loc["y"] * scale, scale, scale);
    ctx.fillStyle = "red";
    ctx.fill();
}


/**
 * Get the relevant box as a constant node, and return it
 * @returns {HTMLElement}
 */
function extracted() {
    const myNode = document.getElementById("box");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    return myNode;
}

/**
 * Function that progresses the game
 * @param Game as the paramater to pass in
 */
function progressGame() {
    let Game = start;
    let find = Game.runGame();
    let pos;
    if (find === 2) {
        pos = Game.doNormalPos();
    } else if (find === 1) {
        pos = Game.doPositions();
        const myNode = extracted();
        let node = document.createTextNode(`🍎 ${Game.getScore()}`);
        myNode.appendChild(node);
    } else if (find === 0) {
        clearInterval(myVar);
        alert("Failed game");
        return;
    }
    drawDirt(pos["freePos"]);
    drawSnake(pos["snakePos"]);
    // Only draw the apple if it's required
    drawApple(pos["applePos"]);
}

