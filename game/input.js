const controls = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    slowDown: false,
    shoot: false
};

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") controls.rightPressed = true;
    if (e.code === "ArrowLeft") controls.leftPressed = true;
    if (e.code === "ArrowDown") controls.downPressed = true;
    if (e.code === "ArrowUp") controls.upPressed = true;
    if (e.code === "ShiftLeft") controls.slowDown = true;
    if (e.code === "Space") controls.shoot = true;
    
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") controls.rightPressed = false;
    if (e.code === "ArrowLeft") controls.leftPressed = false;
    if (e.code === "ArrowDown") controls.downPressed = false;
    if (e.code === "ArrowUp") controls.upPressed = false;
    if (e.code === "ShiftLeft") controls.slowDown = false;
    if (e.code === "Space") controls.shoot = false;
});

export default controls
