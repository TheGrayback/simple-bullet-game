function createPath(posX = 0, posY = 0, width, height) {
    const path = new Path2D();
    path.rect(posX, posY, width, height);
    return path;
}
