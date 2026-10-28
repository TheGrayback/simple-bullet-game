import { Bullet, playerBullet } from "./Bullet.js";
import Player from "./Player.js";
import PracticeTarget from "./Target.js";
import controls from "./input.js";
import { createPath, regHit, regCollide } from "./utils.js";
import { Xcoord, Ycoord, buttonPressed, bulletCount } from "./debug.js";
import { drawPlayerBullets, drawPlayerOnCanvas, drawPracticeTarget } from "./render.js";
import { movePlayerBullets } from "./update.js";

const gameCanvas = document.getElementById("game");
const gameCtx = gameCanvas.getContext("2d");

const player = new Player(0, 0);
player.posY = gameCanvas.height - player.canvasHeight;
player.posX = gameCanvas.width / 2 - player.canvasWidth / 2;

const playerCanvas = document.createElement("canvas");
playerCanvas.width = player.canvasWidth;
playerCanvas.height = player.canvasHeight;
const playerCtx = playerCanvas.getContext("2d");
playerCtx.fillStyle = player.color;
player.path = createPath(0, 0, player.pathWidth, player.pathHeight);
playerCtx.fill(player.path);

const playerBulletCanvas = document.createElement("canvas");
playerBulletCanvas.width = playerBullet.canvasWidth;
playerBulletCanvas.height = playerBullet.canvasHeight;
const playerBulletCtx = playerBulletCanvas.getContext("2d");
playerBulletCtx.fillStyle = playerBullet.color;
const bulletPath = createPath(0, 0, playerBullet.pathWidth, playerBullet.pathHeight);
playerBulletCtx.fill(bulletPath);

const practiceTraget = new PracticeTarget(0, 0);
const practiceTargetCanvas = document.createElement("canvas");
practiceTargetCanvas.width = practiceTraget.canvasWidth;
practiceTargetCanvas.height = practiceTraget.canvasHeight;
const practiceTargetCtx = practiceTargetCanvas.getContext("2d");
practiceTargetCtx.fillStyle = practiceTraget.color;
const targetPath = createPath(0, 0, practiceTraget.pathWidth, practiceTraget.pathHeight);
practiceTargetCtx.fill(targetPath);
practiceTraget.posX = 100;
practiceTraget.posY = 50;

const shootingCooldown = 100;
let lastShotTime = 0;

let playerBullets = [];



function gameLoop() {
    let now = performance.now();
    let shootingCooldownDelta = now - lastShotTime;

    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    let speed = player.speed;

    if (controls.slowDown) {
        speed *= 0.5;
    }
    if (controls.rightPressed) {
        const nextPlayerX = Math.min(player.posX + speed, gameCanvas.width - player.canvasWidth);
        if (
            player.posX + player.canvasWidth < gameCanvas.width &&
            !regCollide(player, practiceTraget, nextPlayerX, player.posY)
        ) {
            player.posX = nextPlayerX;
        }
    }
    if (controls.leftPressed) {
        const nextPlayerX = Math.max(player.posX - speed, 0);
        if (player.posX > 0 && !regCollide(player, practiceTraget, nextPlayerX, player.posY)) {
            player.posX = nextPlayerX;
        }
    }
    if (controls.downPressed) {
        const nextPlayerY = Math.min(player.posY + speed, gameCanvas.height - player.canvasHeight);
        if (
            player.posY + player.pathHeight < gameCanvas.height &&
            !regCollide(player, practiceTraget, player.posX, nextPlayerY)
        ) {
            player.posY = nextPlayerY;
        }
    }
    if (controls.upPressed) {
        const nextPlayerY = Math.max(player.posY - speed, 0);
        if (player.posY > 0 && !regCollide(player, practiceTraget, player.posX, nextPlayerY)) {
            player.posY = nextPlayerY;
        }
    }
    if (controls.shoot && shootingCooldownDelta > shootingCooldown) {
        let bullet = new Bullet(player.posX + (player.canvasWidth - playerBullet.canvasWidth) / 2, player.posY);
        bullet.path = bulletPath;
        playerBullets.push(bullet);
        lastShotTime = now;
    }

    Ycoord.textContent = player.posY.toFixed(1);
    Xcoord.textContent = player.posX.toFixed(1);
    buttonPressed.textContent = Object.entries(controls)
        .filter((x) => x[1])
        .map((x) => x[0]);
    bulletCount.textContent = Number(playerBullets.length);

    movePlayerBullets(playerBullets, practiceTraget);

    drawPlayerOnCanvas(player, playerCanvas, gameCtx);
    drawPracticeTarget(practiceTraget, practiceTargetCanvas, gameCtx);
    drawPlayerBullets(playerBullets, playerBulletCanvas, gameCtx);

    requestAnimationFrame(gameLoop);
}
gameLoop();
