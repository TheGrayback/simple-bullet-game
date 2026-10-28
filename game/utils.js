export const toRad = Math.PI / 180;

export function createPath(posX, posY, width, height) {
    const path = new Path2D();
    path.rect(posX, posY, width, height);
    return path;
}

export function regHit(target, bullet) {
    if (
        Math.max(bullet.posX, target.posX) <
            Math.min(bullet.posX + bullet.canvasWidth, target.posX + target.canvasWidth) &&
        Math.max(bullet.posY, target.posY) <
            Math.min(bullet.posY + bullet.canvasHeight, target.posY + target.canvasHeight)
    )
        return true;
}

export function regCollide(player, target, nextX, nextY) {
    const collisionX =
        Math.max(nextX, target.posX) < Math.min(nextX + player.canvasWidth, target.posX + target.canvasWidth);

    const collisionY =
        Math.max(nextY, target.posY) < Math.min(nextY + player.canvasHeight, target.posY + target.canvasHeight);

    return collisionX && collisionY;
}
