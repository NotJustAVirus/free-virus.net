const canvas = document.getElementById("canvas");
const slider = document.getElementById("speed");
const playbutton = document.getElementById("play");
const size = 20;
let speed = 200;
var game = new gameoflife();
var playing = false;
// for (let i = 0; i < 25; i++) {
    //     game.nextgen();
    // }
    
    // game.board = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0], [0,0,1,1,1,1,0,0,0,0], [0,1,0,0,0,1,0,0,0,0], [0,0,0,0,0,1,0,0,0,0], [0,0,0,0,1,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
canvas.addEventListener('click', function(event) {
    var xVal = event.pageX - this.offsetLeft,
    yVal = event.pageY - this.offsetTop;
    console.log(xVal, yVal);
    x = Math.floor(xVal/20);
    y = Math.floor(yVal/20);
    game.paint(x,y);
    game.draw();
}, false);
game.newrandom(70,30);
let id = null;
clearInterval(id);
play();
function play() {
    if (playing) {
        clearInterval(id);
        playbutton.textContent = "Play";
        playing = false;
    } else {
        id = setInterval(() => {
            game.nextgen();
            game.draw();
        }, speed);
        playbutton.textContent = "Pause";
        playing = true;
    }
}
function randomcanvas() {
    game.newrandom(70,30);
    game.draw();
}
function cleancanvas() {
    game.newclean(70,30);
    game.draw();
}
function changespeed() {
    speed = Math.pow(45-slider.value,2);
    play();
    play();
}
function gameoflife() {
    this.newrandom = function (width,height) {
        this.board = new Array(height);
        for (let y = 0; y < height; y++) {
            this.board[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                this.board[y][x] = Math.round(Math.random());
            }
        }
    }
    this.newclean = function (width,height) {
        this.board = new Array(height);
        for (let y = 0; y < height; y++) {
            this.board[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                this.board[y][x] = 0;
            }
            
        }
    }
    this.nextgen = function () {
        this.nextboard = new Array(this.board.length);
        for (let i = 0; i < this.board.length; i++) {
            this.nextboard[i] = new Array(this.board[i].length);            
        }
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                var neighbors = 0;
                for (let yy = -1; yy <= 1; yy++) {
                    for (let xx = -1; xx <= 1; xx++) {
                        if (yy == 0 && xx == 0) {continue;} 
                        var ny = y+yy;
                        var nx = x+xx;
                        if (ny == -1) {ny = this.board.length-1}
                        else if (ny == this.board.length) {ny = 0}
                        if (nx == -1) {nx = this.board[y].length-1}
                        else if (nx == this.board[y].length) {nx = 0}
                        if (this.board[ny][nx] == 1) {
                            neighbors++;
                        }
                    }    
                }
                var isalive = this.board[y][x];
                switch (neighbors) {
                    case 0:
                    case 1:
                        isalive = 0;
                        break;
                    case 2:
                        break;
                    case 3:
                        isalive = 1;
                        break;
                    default:
                        isalive = 0;
                        break;
                }
                this.nextboard[y][x] = isalive;
            } 
        }
        this.board = this.nextboard.slice();
    }
    this.draw = function () {
        const context = canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle = "#FFFFFF";
        // console.log(this.board);
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x]) {
                    context.fillRect(x*size, y*size,size,size);
                }
            }
        }
    }
    this.paint = function (x,y) {
        if (this.board[y][x]) {
            this.board[y][x] = 0;
        } else {
            this.board[y][x] = 1;
        }
    }
}