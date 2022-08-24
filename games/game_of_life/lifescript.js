const canvas = document.getElementById("canvas");
var grf = canvas.getContext("2d");
var life = [13,23];
const size = 20;

console.log("test");
grf.fillStyle = "#FFFFFF";
grf.fillRect(20, 20,size,size);
draw();
function draw() {
    life.forEach(box => {
        var x = (box%10)*20;
        var y = Math.floor(box/10)*20;
        grf.fillStyle = "#FFFFFF";
        grf.fillRect(x, y,size,size);
    });
}
function gameoflife() {
    this.newrandom = function (width,height) {
        this.board = new Array(height);
        for (let y = 0; y < width; y++) {
            this.board[y] = new Array(width);
            for (let x = 0; x < height; x++) {
                this.board[y][x] = Math.round(Math.random());
            }
            
        }
    }
    this.newclean = function (width,height) {
        this.board = new Array(height);
        for (let y = 0; y < width; y++) {
            this.board[y] = new Array(width);
            for (let x = 0; x < height; x++) {
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
                
            }
            
        }
    }
}