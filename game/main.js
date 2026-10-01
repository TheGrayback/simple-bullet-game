const gameCanvas = document.getElementById("game");
const playerSprite = document.createElement("canvas");
playerSprite.width = 20;
playerSprite.height = 20;
const gameCtx = gameCanvas.getContext("2d");
const movePlayerX = document.getElementById("pX");
const movePlayerY = document.getElementById("pY");

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
    gameCtx.drawImage(
        playerSprite,
        Number(movePlayerX.value),
        Number(movePlayerY.value),
    );
}

drawPlayerOnCanvas();
movePlayerX.addEventListener("input", drawPlayerOnCanvas);
movePlayerY.addEventListener("input", drawPlayerOnCanvas);
