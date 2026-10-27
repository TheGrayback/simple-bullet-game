import { Bullet, playerBullet } from "./Bullet.js";
import Player from "./Player.js";
import PracticeTarget from "./Target.js";
import controls from "./input.js";
import { createPath } from "./utils.js";

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

const Xcoord = document.getElementById("playerX");
const Ycoord = document.getElementById("playerY");
const buttonPressed = document.getElementById("button");
const bulletCount = document.getElementById("bulletCount");
const shootingDeltaView = document.getElementById("delta");
const perfnow = document.getElementById("perfnow");

const toRad = Math.PI / 180;
const shootingCooldown = 100;
let lastShotTime = 0;

let playerBullets = [];

function drawPlayerOnCanvas(player, playerCanvas, gameCtx) {
    gameCtx.drawImage(playerCanvas, player.posX, player.posY);
}

function drawPlayerBullet(bullet, bulletCanvas, gameCtx) {
    gameCtx.drawImage(bulletCanvas, bullet.posX, bullet.posY);
}

function drawPracticeTarget(target, targetCanvas, gameCtx) {
    gameCtx.drawImage(targetCanvas, target.posX, target.posY);
}

function regHit(target, bullet) {
    if (
        Math.max(bullet.posX, target.posX) <=
            Math.min(bullet.posX + bullet.canvasWidth, target.posX + target.canvasWidth) &&
        Math.max(bullet.posY, target.posY) <=
            Math.min(bullet.posY + bullet.canvasHeight, target.posY + target.canvasHeight)
    )
        return true;
}

function regCollide(player, target, nextX, nextY) {
    const collisionX =
        Math.max(nextX, target.posX) <= Math.min(nextX + player.canvasWidth, target.posX + target.canvasWidth);

    const collisionY =
        Math.max(nextY, target.posY) <= Math.min(nextY + player.canvasHeight, target.posY + target.canvasHeight);

    return collisionX && collisionY;
}

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
    // shootingDeltaView.textContent = Number(shootingCooldownDelta);
    // perfnow.textContent = Number(performance.now());

    drawPlayerOnCanvas(player, playerCanvas, gameCtx);
    drawPracticeTarget(practiceTraget, practiceTargetCanvas, gameCtx);

    for (let i = playerBullets.length - 1; i >= 0; i--) {
        const bullet = playerBullets[i];
        drawPlayerBullet(bullet, playerBulletCanvas, gameCtx);
        bullet.posY -= bullet.speed;
        if (regHit(practiceTraget, bullet)) playerBullets.splice(i, 1);
        if (bullet.posY < 0) {
            playerBullets.splice(i, 1);
            continue;
        }
    }
    // console.log(shootingCooldownStart);

    requestAnimationFrame(gameLoop);
}
gameLoop();
