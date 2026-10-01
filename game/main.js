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

const toRad = Math.PI / 180;

const Player = {
    width: 20,
    height: 20,
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
    if (
        e.code == "ArrowRight" &&
        movePlayerX + Player.width < gameCanvas.width
    ) {
        rightPressed = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") rightPressed = false;
});

window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft" && movePlayerX > 0) {
        leftPressed = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") leftPressed = false;
});

window.addEventListener("keydown", (e) => {
    if (
        e.code == "ArrowDown" &&
        movePlayerY + Player.height < gameCanvas.height
    ) {
        downPressed = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowDown") downPressed = false;
});

window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp" && movePlayerY > 0) {
        upPressed = true;
    }
});
window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowUp") upPressed = false;
});

function gameLoop() {
    if (rightPressed) movePlayerX += 5;
    if (leftPressed) movePlayerX -= 5;
    if (downPressed) movePlayerY += 5;
    if (upPressed) movePlayerX -= 5;
}
