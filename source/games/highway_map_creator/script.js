
$(document).ready(function(){
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const mainCanvas = document.getElementById('mainCanvas');
    const mainCtx = mainCanvas.getContext('2d');
    const poiList = document.getElementById('objectList').querySelector('.poi-list');

    const banners = [
        "black_banner",
        "blue_banner",
        "brown_banner",
        "cyan_banner",
        "gray_banner",
        "green_banner",
        "light_blue_banner",
        "light_gray_banner",
        "lime_banner",
        "magenta_banner",
        "orange_banner",
        "pink_banner",
        "purple_banner",
        "red_banner",
        "white_banner",
        "yellow_banner"
    ];

    // draw checkered background on main canvas
    function drawCheckeredBackground() {
        const size = 1; // size of each square
        for (let x = 0; x < mainCanvas.width; x += size) {
            for (let y = 0; y < mainCanvas.height; y += size) {
                mainCtx.fillStyle = (x / size + y / size) % 2 === 0 ? '#f0f0f0' : '#303030ff';
                mainCtx.fillRect(x, y, size, size);
            }
        }
    }
    drawCheckeredBackground();

    function drawMap() {
        const img = new Image();
        img.src = 'images/map_background.png';
        img.onload = function() {
            backgroundCtx.drawImage(img, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
        };
    }

    drawMap();
});

