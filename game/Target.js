class PracticeTarget {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    posX;
    posY;
    canvasWidth = 100;
    canvasHeight = 30;
    pathWidth = 100;
    pathHeight = 30;
    speed = 0;
    color = "#d5552a";
    path = null;
}

export default PracticeTarget