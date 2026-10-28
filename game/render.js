export function drawPlayerOnCanvas(player, playerCanvas, gameCtx) {
    gameCtx.drawImage(playerCanvas, player.posX, player.posY);
}

export function drawPlayerBullets(bullets, bulletCanvas, gameCtx) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        gameCtx.drawImage(bulletCanvas, bullet.posX, bullet.posY);
    }
}

export function drawPracticeTarget(target, targetCanvas, gameCtx) {
    gameCtx.drawImage(targetCanvas, target.posX, target.posY);
}
