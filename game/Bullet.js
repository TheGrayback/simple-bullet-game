export class Bullet {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    canvasWidth = 5;
    canvasHeight = 5;
    pathWidth = 5;
    pathHeight = 5;
    color = "#ffffff";
    posX;
    posY;
    speed = 5;
    path = null;

    move() {
        this.posY += this.speed;
    }
}

export const playerBullet = {
    canvasWidth: 5,
    canvasHeight: 5,
    pathWidth: 5,
    pathHeight: 5,
    color: "#ffffff",
};
