const Player = {
    canvasWidth: 20,
    canvasHeight: 20,
    pathWidth: 20,
    pathHeight: 20,
    speed: 3,
    color: "rgb(117, 177, 212)",
    path: null,
    createPath(width, height) {
        const path = new Path2D();
        path.rect(0, 0, width, height);
        return path;
    },
};

export default Player;
