class Bullet {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    canvasWidth = 15;
    canvasHeight = 15;
    pathWidth = 15;
    pathHeight = 15;
    speed = 3;
    posX = 0;
    posY = 0;
    color = "#ffffff";
    path = null;

    move() {
        this.y += this.speed;
    }
}

export default Bullet;
