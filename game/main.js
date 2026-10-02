import Bullet from "./Bullet.js";
import Player from "./Player.js";
import controls from "./input.js";
import { createPath } from "./utils.js";

const gameCanvas = document.getElementById("game");
const gameCtx = gameCanvas.getContext("2d");

const player = new Player(0, 0);

const playerCanvas = document.createElement("canvas");
playerCanvas.width = player.canvasWidth;
playerCanvas.height = player.canvasHeight;
const playerCtx = playerCanvas.getContext("2d");
playerCtx.fillStyle = player.color;
player.path = createPath(0, 0, player.pathWidth, player.pathHeight);
playerCtx.fill(player.path);

const playerBulletCanvas = document.createElement("canvas");
const playerBulletCtx = playerBulletCanvas.getContext("2d");
playerBulletCtx.fillStyle = Bullet.color;
const bulletPath = createPath(0, 0, Bullet.pathWidth, Bullet.pathHeight);
playerBulletCtx.fill(bulletPath);

const Xcoord = document.getElementById("playerX");
const Ycoord = document.getElementById("playerY");
const buttonPressed = document.getElementById("button");

const toRad = Math.PI / 180;
const playerBullets = [];

function drawPlayerOnCanvas(player, playerCanvas, gameCtx) {
    gameCtx.drawImage(playerCanvas, player.posX, player.posY);
}

function drawPlayerBullet(bullet, bulletCanvas, gameCtx) {
    // console.log(bullet);
    gameCtx.drawImage(bulletCanvas, bullet.posX, bullet.posY);
}

function gameLoop() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    let speed = player.speed;

    if (controls.slowDown) {
        speed *= 0.5;
    }
    if (controls.rightPressed && player.posX + player.pathWidth < gameCanvas.width) {
        player.posX += speed;
    }
    if (controls.leftPressed && player.posX > 0) {
        player.posX -= speed;
    }
    if (controls.downPressed && player.posY + player.pathHeight < gameCanvas.height) {
        player.posY += speed;
    }
    if (controls.upPressed && player.posY > 0) {
        player.posY -= speed;
    }
    if (controls.shoot) {
        let bullet = new Bullet(player.posX, player.posY);
        bullet.path = bulletPath;
        playerBullets.push(bullet);
    }

    Ycoord.textContent = player.posY.toFixed(1);
    Xcoord.textContent = player.posX.toFixed(1);
    buttonPressed.textContent = Object.entries(controls)
        .filter((x) => x[1])
        .map((x) => x[0]);

    for (const bullet of playerBullets) {
        drawPlayerBullet(bullet, playerBulletCanvas, gameCtx);
    }

    drawPlayerOnCanvas(player, playerCanvas, gameCtx);
    // console.log(playerBullets);
    requestAnimationFrame(gameLoop);
}

gameLoop();
