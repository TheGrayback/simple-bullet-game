export function createPath(posX, posY, width, height) {
    const path = new Path2D();
    path.rect(posX, posY, width, height);
    return path;
}

