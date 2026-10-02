const Player = {
    width: 20,
    height: 20,
    speed: 3,
    color: "rgb(130, 176, 203)",
    path: null,
    createPath(width, height) {
        const path = new Path2D();
        path.rect(0, 0, width, height);
        return path;
    },
};

export default Player;
