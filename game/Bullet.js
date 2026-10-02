class Bullet {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    static canvasWidth = 5;
    static canvasHeight = 5;
    static pathWidth = 5;
    static pathHeight = 5;
    static color = "#ffffff";
    posX;
    posY;
    speed = 15;
    path = null;

    move() {
        this.posY += this.speed;
    }
}

export default Bullet;
