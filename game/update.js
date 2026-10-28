import { regHit } from "./utils.js";

export function movePlayerBullets(playerBullets, target) {
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        const bullet = playerBullets[i];
        bullet.posY -= bullet.speed;

        if (regHit(target, bullet)) playerBullets.splice(i, 1);
        if (bullet.posY < 0) {
            playerBullets.splice(i, 1);
            continue;
        }
    }
}