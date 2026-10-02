class Player {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    posX;
    posY;
    canvasWidth = 20;
    canvasHeight = 20;
    pathWidth = 20;
    pathHeight = 20;
    speed = 3;
    color = "#2ad5b9";
    path = null;
}

export default Player;
