import Player from "./Player.js";
import controls from "./input.js";

const gameCanvas = document.getElementById("game");
const gameCtx = gameCanvas.getContext("2d");
const playerCanvas = document.createElement("canvas");
const playerContext = playerCanvas.getContext("2d");
const Xcoord = document.getElementById("playerX");
const Ycoord = document.getElementById("playerY");
playerCanvas.width = 20;
playerCanvas.height = 20;
let movePlayerX = 0;
let movePlayerY = 0;

const toRad = Math.PI / 180;

function drawPlayerOnCanvas(Player, playerCanvas, playerContext, gameCtx, moveX, moveY) {
    playerContext.fillStyle = Player.color;
    Player.path = Player.createPath(Player.width, Player.height);
    playerContext.fill(Player.path);
    gameCtx.drawImage(playerCanvas, moveX, moveY);
}

function gameLoop() {
    let speed = Player.speed;
    if (controls.slowDown) {
        speed *= 0.5;
    }
    if (controls.rightPressed && movePlayerX + Player.width < gameCanvas.width) {
        movePlayerX += speed;
    }
    if (controls.leftPressed && movePlayerX > 0) {
        movePlayerX -= speed;
    }
    if (controls.downPressed && movePlayerY + Player.height < gameCanvas.height) {
        movePlayerY += speed;
    }
    if (controls.upPressed && movePlayerY > 0) {
        movePlayerY -= speed;
    }

    Ycoord.textContent = movePlayerY.toFixed(1);
    Xcoord.textContent = movePlayerX.toFixed(1);

    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawPlayerOnCanvas(Player, playerCanvas, playerContext, gameCtx, movePlayerX, movePlayerY);
    requestAnimationFrame(gameLoop);
}

gameLoop();
