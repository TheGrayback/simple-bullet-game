const gameCanvas = document.getElementById("game");
const playerSprite = document.createElement("canvas");
const Xcoord = document.getElementById("playerX");
const Ycoord = document.getElementById("playerY");
playerSprite.width = 20;
playerSprite.height = 20;
const gameCtx = gameCanvas.getContext("2d");
// const movePlayerX = document.getElementById("pX");
// const movePlayerY = document.getElementById("pY");
let movePlayerX = 0;
let movePlayerY = 0;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let slowDown = false;

const toRad = Math.PI / 180;

const Player = {
    width: 20,
    height: 20,
    speed: 3,
    context: playerSprite.getContext("2d"),
    createPath(width, height) {
        const sprite = new Path2D();
        sprite.rect(0, 0, width, height);
        return sprite;
    },
    drawPlayer() {
        this.context.fillStyle = "rgb(130, 176, 203)";
        this.context.strokeStyle = "rgb(130, 176, 203)";
        this.context.fill(this.createPath(this.width, this.height));
    },
};

Player.drawPlayer();

function drawPlayerOnCanvas() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCtx.drawImage(playerSprite, movePlayerX, movePlayerY);
}

drawPlayerOnCanvas();

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") rightPressed = true;
    if (e.code === "ArrowLeft") leftPressed = true;
    if (e.code === "ArrowDown") downPressed = true;
    if (e.code === "ArrowUp") upPressed = true;
    if (e.code === "ShiftLeft") slowDown = true;
});
window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") rightPressed = false;
    if (e.code === "ArrowLeft") leftPressed = false;
    if (e.code === "ArrowDown") downPressed = false;
    if (e.code === "ArrowUp") upPressed = false;
    if (e.code === "ShiftLeft") slowDown = false;
});

function gameLoop() {
    let speed = Player.speed;
    if (slowDown) {
        speed *= 0.5;
    }
    if (rightPressed && movePlayerX + Player.width < gameCanvas.width) {
        movePlayerX += speed;
    }
    if (leftPressed && movePlayerX > 0) {
        movePlayerX -= speed;
    }
    if (downPressed && movePlayerY + Player.height < gameCanvas.height) {
        movePlayerY += speed;
    }
    if (upPressed && movePlayerY > 0) {
        movePlayerY -= speed;
    }

    Ycoord.textContent = movePlayerY.toFixed(1);
    Xcoord.textContent = movePlayerX.toFixed(1);

    drawPlayerOnCanvas();
    requestAnimationFrame(gameLoop);
}

gameLoop();
