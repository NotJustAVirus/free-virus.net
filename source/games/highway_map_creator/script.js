
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

        constructor(name, x, z, banner) {
            this.name = name;
            this.x = x;
            this.z = z;
            this.banner = banner;
            this.listElement = poiListElement.clone();
            this.listElement.find('.obj-name').val(name);
            this.listElement.find('.obj-x').val(x);
            this.listElement.find('.obj-z').val(z);
            this.listElement.find('.obj-name').on('input', this.updateValues.bind(this));
            this.listElement.find('.obj-name').on('change', this.updateValues.bind(this));
            this.listElement.find('.obj-x').on('input', this.updateValues.bind(this));
            this.listElement.find('.obj-x').on('change', this.updateValues.bind(this));
            this.listElement.find('.obj-z').on('input', this.updateValues.bind(this));
            this.listElement.find('.obj-z').on('change', this.updateValues.bind(this));
            this.setBanner(banner);
            $('.poi-list').append(this.listElement);
            this.listElement.show();
            POI.POIS.push(this);
        }

        updateValues() {
            this.setName(this.listElement.find('.obj-name').val());
            this.setPosition(
                parseInt(this.listElement.find('.obj-x').val(), 10),
                parseInt(this.listElement.find('.obj-z').val(), 10)
            );
            updatePOIMap();
        }
        
        setName(name) {
            this.name = name;
        }

        setPosition(x, z) {
            this.x = x || 0;
            this.z = z || 0;
        }

        setBanner(banner) {
            this.banner = banner;
            this.listElement.find('.banner-icon img').attr('src', `images/banners/${banner}.png`);
        }

        drawPOI(scale, bounds) {
            let img = new Image();
            img.src = `images/banners/${this.banner}.png`;
            img.onload = () => {
                poiCtx.imageSmoothingEnabled = false;
                poiCtx.save();
                poiCtx.translate((this.x - bounds.minX) * 4 * scale, (this.z - bounds.minZ) * 4 * scale);
                poiCtx.drawImage(img, -16, -16, 32, 32);
                if (this.name && this.name.length > 0) {
                    poiCtx.fillStyle = '#444444aa';
                    let textWidth = poiCtx.measureText(this.name).width;
                    poiCtx.fillRect(-textWidth / 2 - 3, 18, textWidth + 6, 16);
                    poiCtx.fillStyle = 'white';
                    // poiCtx.font = '12px Arial';
                    poiCtx.textAlign = 'center';
                    poiCtx.fillText(this.name, 0, 30);
                }
                poiCtx.restore();
            };
        }
    }

    
    function updatePOIMap() {
        poiCtx.clearRect(0, 0, poiCanvas.width, poiCanvas.height);
        let poiBounds = {
            minX: Infinity,
            maxX: -Infinity,
            minZ: Infinity,
            maxZ: -Infinity
        }
        POI.POIS.forEach(poi => {
            poiBounds.minX = Math.min(poiBounds.minX, poi.x);
            poiBounds.maxX = Math.max(poiBounds.maxX, poi.x);
            poiBounds.minZ = Math.min(poiBounds.minZ, poi.z);
            poiBounds.maxZ = Math.max(poiBounds.maxZ, poi.z);
        });
        let mapX = mainCanvas.width;
        let mapZ = mainCanvas.height;
        let edgePadding = 8;
        let scaleX = (mapX - 2 * edgePadding) / (poiBounds.maxX - poiBounds.minX);
        let scaleZ = (mapZ - 2 * edgePadding) / (poiBounds.maxZ - poiBounds.minZ);
        let scale = Math.min(scaleX, scaleZ);
        poiBounds.minX -= edgePadding / scale;
        poiBounds.maxX += edgePadding / scale;
        poiBounds.minZ -= edgePadding / scale;
        poiBounds.maxZ += edgePadding / scale;
        POI.POIS.forEach(poi => poi.drawPOI(scale, poiBounds));
    }
    
    new POI('Start', 64, 64, 'green_banner');
    new POI('End', 32, 96, 'red_banner');
    new POI('Checkpoint', 96, 64, 'blue_banner');
    updatePOIMap();
});

