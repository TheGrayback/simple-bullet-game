const Bullet = {
    canvasWidth: 15,
    canvasHeight: 15,
    pathWidth: 15,
    pathHeight: 15,
    speed: 3,
    posX: 0,
    posY: 0,
    color: "#ffffff",
    path: null,
    createPath(width, height) {
        const path = new Path2D();
        path.rect(0, 0, width, height);
        return path;
    },
};

export default Bullet;
