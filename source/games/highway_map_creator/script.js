
$(document).ready(function(){
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const mainCanvas = document.getElementById('mainCanvas');
    const mainCtx = mainCanvas.getContext('2d');
    const poiCanvas = document.getElementById('poiCanvas');
    const poiCtx = poiCanvas.getContext('2d');
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
                mainCtx.fillStyle = (x / size + y / size) % 2 === 0 ? '#f0f0f0' : '#ff0000ff';
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

    const poiListElement = $('.list-obj.dummy');
    poiListElement.removeClass('dummy');
    poiListElement.hide();

    
    class POI {
        static POIS = [];

        constructor(name, x, y, banner) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.banner = banner;
            this.listElement = poiListElement.clone();
            this.listElement.find('.obj-name').val(name);
            this.listElement.find('.obj-x').val(x);
            this.listElement.find('.obj-y').val(y);
            this.listElement.find('.obj-name').on('change', (e) => {
                this.setName(e.target.value);
                updatePOIMap();
            });
            this.listElement.find('.obj-x').on('change', (e) => {
                this.setPosition(parseInt(e.target.value, 10), this.y);
                updatePOIMap();
            });
            this.listElement.find('.obj-y').on('change', (e) => {
                this.setPosition(this.x, parseInt(e.target.value, 10));
                updatePOIMap();
            });
            this.setBanner(banner);
            $('.poi-list').append(this.listElement);
            this.listElement.show();
            POI.POIS.push(this);
        }
        
        setName(name) {
            this.name = name;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        setBanner(banner) {
            this.banner = banner;
            this.listElement.find('.banner-icon img').attr('src', `images/banners/${banner}.png`);
        }

        drawPOI() {
            let img = new Image();
            img.src = `images/banners/${this.banner}.png`;
            img.onload = () => {
                poiCtx.imageSmoothingEnabled = false;
                poiCtx.save();
                poiCtx.translate(this.x * 4, this.y * 4);
                poiCtx.drawImage(img, -16, -16, 32, 32);
                poiCtx.restore();
            };
        }
    }

    
    function updatePOIMap() {
        poiCtx.clearRect(0, 0, poiCanvas.width, poiCanvas.height);
        POI.POIS.forEach(poi => poi.drawPOI());
    }
    
    new POI('Start', 64, 64, 'green_banner');
    updatePOIMap();
});

