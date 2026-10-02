import Bullet from "./Bullet.js";
import Player from "./Player.js";
import controls from "./input.js";

const gameCanvas = document.getElementById("game");
const gameCtx = gameCanvas.getContext("2d");

const playerCanvas = document.createElement("canvas");
playerCanvas.width = Player.canvasWidth;
playerCanvas.height = Player.canvasHeight;
const playerCtx = playerCanvas.getContext("2d");

const playerBulletCanvas = document.createElement("canvas");
const playerBulletCtx = playerBulletCanvas.getContext("2d");

const Xcoord = document.getElementById("playerX");
const Ycoord = document.getElementById("playerY");
const buttonPressed = document.getElementById("button");

const toRad = Math.PI / 180;
const playerBullets = [];

function drawPlayerOnCanvas(Player, playerCanvas, playerCtx, gameCtx, posX, posY) {
    playerCtx.fillStyle = Player.color;
    Player.path = Player.createPath(Player.pathWidth, Player.pathHeight);
    playerCtx.fill(Player.path);
    gameCtx.drawImage(playerCanvas, posX, posY);
}

function drawPlayerBullet(bullet, bulletCanvas, bulletCtx, gameCtx, posX0, posY0) {
    bulletCtx.fillStyle = bullet.color;
    bullet.path = bullet.createPath(bullet.pathWidth, bullet.pathHeight);
    bulletCtx.fill(bullet.path);
    gameCtx.drawImage(bulletCanvas, posX0, posY0);
}

function gameLoop() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    let speed = Player.speed;

    if (controls.slowDown) {
        speed *= 0.5;
    }
    if (controls.rightPressed && Player.posX + Player.pathWidth < gameCanvas.width) {
        Player.posX += speed;
    }
    if (controls.leftPressed && Player.posX > 0) {
        Player.posX -= speed;
    }
    if (controls.downPressed && Player.posY + Player.pathHeight < gameCanvas.height) {
        Player.posY += speed;
    }
    if (controls.upPressed && Player.posY > 0) {
        Player.posY -= speed;
    }
    if (controls.shoot) {
        let bullet = new Bullet
        drawPlayerBullet(bullet, playerBulletCanvas, playerBulletCtx, gameCtx, Player.posX, Player.posY);
        playerBullets.push(bullet)
    }

    Ycoord.textContent = Player.posY.toFixed(1);
    Xcoord.textContent = Player.posX.toFixed(1);
    buttonPressed.textContent = Object.entries(controls)
        .filter((x) => x[1])
        .map((x) => x[0]);

    drawPlayerOnCanvas(Player, playerCanvas, playerCtx, gameCtx, Player.posX, Player.posY);
    console.log(playerBullets);
    requestAnimationFrame(gameLoop);
}

gameLoop();
