var board = [];
const gridSize = 100;
var paused = false;
function init() {
    const canvas = document.getElementById("conway");
    var ctx = canvas.getContext("2d");
    var larger = Math.max(window.innerWidth, window.innerHeight);
    canvas.width = larger;
    canvas.height = larger;
    var xSpace = canvas.width/gridSize;
    var ySpace = canvas.height/gridSize;
    var mouseIsDown = false;
    var dragState = 0;
    canvas.onmousedown = function(e)
    {
        mouseIsDown = true;
        var pos = getMousePosition(canvas, e);
        dragState = board[pos[0]][pos[1]];
        console.log(dragState);
    };
    canvas.onmouseup = function(e) {
        mouseIsDown = false;
        var pos = getMousePosition(canvas, e);
        setCell(pos[0], pos[1], dragState);
    }
    canvas.onmousemove = function(e) {
        if(!mouseIsDown) return;
        var pos = getMousePosition(canvas, e);
        setCell(pos[0], pos[1], dragState);
        return false;
    }
    window.addEventListener('keydown', function(e)
    {
        check(e);
    }, false);
    fillRandom();
    window.requestAnimationFrame(draw);
}
function draw() {
    const canvas = document.getElementById("conway");
    var ctx = canvas.getContext("2d");
    var xSpace = canvas.width/gridSize;
    var ySpace = canvas.height/gridSize;
    for(var i=0;i<gridSize;i++) {
        for(var j=0;j<gridSize;j++) {
            if(board[i][j]===1) {
                ctx.fillStyle = "rgb(255,255,255)";
            } else {
                ctx.fillStyle = "rgb(0, 0, 0)";
            }
            ctx.fillRect(i*xSpace, j*ySpace, xSpace, ySpace);
        }
    }
    window.requestAnimationFrame(draw);
    next();
}

function numNeighbors(i, j) {
    n = 0;
    if (i!==0) {
        if(board[i-1][j]===1) {n++}
        if(j!==0){if(board[i-1][j-1]===1) {n++}}
        if(j!==gridSize-1){if(board[i-1][j+1]===1) {n++}}
    }
    if (i!==gridSize-1) {
        if(j!==0){if(board[i+1][j-1]===1) {n++}}
        if(board[i+1][j]===1) {n++}
        if(j!==gridSize-1){if(board[i+1][j+1]===1) {n++}}
    }
    if(board[i][j-1]===1 && j!==0) {n++}
    if(board[i][j+1]===1 && j!==gridSize-1) {n++}
    if(n===3) {
        return 1;
    } else if(n===2 && board[i][j]===1) {
        return 1;
    } else {
        return 0;
    }
}

function next() {
    if(paused) {
        return;
    }
    var _board = [];
    for(var i=0;i<gridSize;i++) {
        var row = [];
        for(var j=0;j<gridSize;j++) {
            row[j] = numNeighbors(i, j);
        }
        _board[i] = row;
    }
    board = _board;
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    var celLoc = [Math.floor(x/(canvas.width/gridSize)), Math.floor(y/(canvas.height/gridSize))];
    return celLoc;
}

function setCell(x, y, state) {
    if(state === 1) {
        board[x][y] = 0;
    } else {
        board[x][y] = 1;
    }
}

function clear() {
    const canvas = document.getElementById("conway");
    var ctx = canvas.getContext("2d");
    var xSpace = canvas.width/gridSize;
    var ySpace = canvas.height/gridSize;
    for(var i=0;i<gridSize;i++) {
        var row = [];
        for(var j=0;j<gridSize;j++) {
            row[j] = 0;
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(i*xSpace, j*ySpace, xSpace, ySpace);
        }
        board[i] = row;
    }
}

function fillRandom() {
    const canvas = document.getElementById("conway");
    var ctx = canvas.getContext("2d");
    var xSpace = canvas.width/gridSize;
    var ySpace = canvas.height/gridSize;
    for(var i=0;i<gridSize;i++) {
        var row = [];
        for(var j=0;j<gridSize;j++) {
            row[j] = Math.floor(Math.random()*2);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(i*xSpace, j*ySpace, xSpace, ySpace);
        }
        board[i] = row;
    }
}

function pauseToggle() {
    paused = !paused;
}

function toggleInst() {
    var inst = document.getElementById("instructions");
    if (inst.open) {
        inst.close();
    } else {
        inst.showModal();
    }
}

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 67: clear(); break; //C Key
        case 82: fillRandom(); break; //R Key
        case 80: pauseToggle(); break; //P Key
        case 78: pauseToggle();next();pauseToggle(); break; //N Key
        case 73: toggleInst(); break;
    }
}
