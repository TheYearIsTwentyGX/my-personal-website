const h2 = document.createElement("h2");
h2.textContent = "This content added via JavaScript";
document.querySelector("h1").parentElement.insertBefore(h2, document.querySelector("h1").nextSibling);

const playField = document.getElementById("playField").getBoundingClientRect();
const spdDwn = document.getElementById("spdDown");
const spdUp = document.getElementById("spdUp");
spdDwn.style.left = `${playField.left + 25}px`;
spdDwn.style.top = `${playField.bottom + 25}px`;
spdUp.style.left = `${playField.right - spdUp.clientWidth - 25}px`;
spdUp.style.top = `${playField.bottom + 25}px`;

const playerMirror = document.getElementById("playerMirror");
const playerSq = document.getElementById("player");

const moveSpeed = 2;

document.addEventListener("keydown", function (event) {
    //Keep player within playField boundaries, looping if necessary
    if (getPlayerLeft() < -30)
        playerSq.style.left = `${getPlayerLeft() + 400}px`;
    playerSq.style.left = `${getPlayerLeft() % 400}px`;
    if (getPlayerBtm() < -30)
        playerSq.style.bottom = `${getPlayerBtm() + 400}px`;
    playerSq.style.bottom = `${getPlayerBtm() % 400}px`;
    switch (event.key)
    {
        case "ArrowLeft":
            moveSqHoriz(true);
            break;
        case "ArrowRight":
            moveSqHoriz();
            break;
        case "ArrowUp":
            moveSqVert();
            break;
        case "ArrowDown":
            moveSqVert(true);
            break;
    }
    //Handle playerMirror X coords
    if (getPlayerLeft() > 369)
        playerMirror.style.left = `${getPlayerLeft() - 400}px`;
    else if (getPlayerLeft() < 1)
        playerMirror.style.left = `${getPlayerLeft() + 400}px`;
    else
        playerMirror.style.left = playerSq.style.left;

    //Handle playerMirror Y coords
    if (getPlayerBtm() > 369)
        playerMirror.style.bottom = `${getPlayerBtm() - 400}px`;
    else if (getPlayerBtm() < 1)
        playerMirror.style.bottom = `${getPlayerBtm() + 400}px`;
    else
        playerMirror.style.bottom = playerSq.style.bottom;
    //BUG: Corners are a little finicky. 
    //Would need to add 2 additional mirrors to make that work as expected, 
    //but that's too much work for this project
});

function getPlayerLeft() {
    const leftStr = playerSq.style.left.replace("px", "");
    return parseInt(leftStr, 10);
}

function getPlayerBtm() {
    const btmStr = playerSq.style.bottom.replace("px", "");
    return parseInt(btmStr, 10);
}

function moveSqHoriz(subtract = false) {
    playerSq.style.left = `${subtract ? getPlayerLeft() - moveSpeed : getPlayerLeft() + moveSpeed}px`;
}

function moveSqVert(subtract = false) {
    playerSq.style.bottom = `${subtract ? getPlayerBtm() - moveSpeed : getPlayerBtm() + moveSpeed}px`;
}