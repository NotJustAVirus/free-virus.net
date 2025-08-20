
$(document).ready(function(){
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const mainCanvas = document.getElementById('mainCanvas');
    const mainCtx = mainCanvas.getContext('2d');
    const poiCanvas = document.getElementById('poiCanvas');
    const poiCtx = poiCanvas.getContext('2d');
    const poiList = document.getElementById('objectList').querySelector('.poi-list');
    poiCtx.imageSmoothingEnabled = false;

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

    const bannerSelector = $('#bannerSelector');
    banners.forEach(banner => {
        const img = $('<img>', {
            src: `images/banners/${banner}.png`,
            alt: banner,
        });
        const button = $('<button>', {
            class: 'banner-icon',
        }).append(img);
        bannerSelector.append(button);
    });
    bannerSelector.hide();

    $('.poi-list').sortable({});
    $('.path-list').sortable({});

    $('#editMode').on('change', function() {
        let val = $(this).val();
        $('.toolSection').hide();
        $(`.${val}`).show();
    });

    $('#editMode').trigger('change');

    $('.dirButton').on('click', function() {
        $('.dirButton').removeClass('selected');
        $(this).addClass('selected');
    });

    $('#poiCanvas').on('mousemove', function(event) {
        let x = event.offsetX;
        let z = event.offsetY;
        let foundPOI = null;
        for (let poi of POI.POIS) {
            if (poi.visualX + 16 > x && poi.visualX < x + 16
                && poi.visualZ < z + 16 && poi.visualZ + 16 > z) {
                foundPOI = poi;
            }
        }
        if (foundPOI) {
            $(this).css('cursor', 'pointer');
        } else {
            $(this).css('cursor', 'default');
        }
    });

    $('#poiCanvas').on('click', function(event) {
        let x = event.offsetX;
        let z = event.offsetY;

        let foundPOI = null;
        let distance = Infinity;
        for (let poi of POI.POIS) {
            if (poi.visualX + 16 > x && poi.visualX < x + 16
                && poi.visualZ < z + 16 && poi.visualZ + 16 > z) {
                let dx = poi.visualX - x;
                let dz = poi.visualZ - z;
                let dist = Math.sqrt(dx * dx + dz * dz);
                if (dist < distance) {
                    distance = dist;
                    foundPOI = poi;
                }
            }
        }
        if (foundPOI) {
            console.log(`Found POI: ${foundPOI.name}`);
            ToolController.clickPOI(foundPOI);
        }
    });

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

    const poiListElement = $('.list-obj.poi-element.dummy');
    poiListElement.removeClass('dummy');
    poiListElement.hide();

    const pathListElement = $('.list-obj.path-element.dummy');
    pathListElement.removeClass('dummy');
    pathListElement.hide();

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
            this.listElement.find('.remove-obj').on('click', () => {
                this.listElement.remove();
                POI.POIS = POI.POIS.filter(p => p !== this);
                updatePOIMap();
            });
            this.listElement.find('.banner-icon').on('click', () => {
                bannerSelector.show();
                bannerSelector.off('click').on('click', 'button', (e) => {
                    const selectedBanner = $(e.currentTarget).find('img').attr('alt');
                    bannerSelector.hide();
                    this.setBanner(selectedBanner);
                    updatePOIMap();
                });
            });
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
            this.listElement.find('.banner-icon img').attr('alt', banner);
        }

        drawPOI(scale, bounds) {
            let img = new Image();
            img.src = `images/banners/${this.banner}.png`;
            this.xOnMap = Math.round((this.x - bounds.minX) * scale);
            this.zOnMap = Math.round((this.z - bounds.minZ) * scale);
            this.visualX = this.xOnMap * 4;
            this.visualZ = this.zOnMap * 4;
            img.onload = () => {
                poiCtx.save();
                poiCtx.translate(this.visualX, this.visualZ);
                if (this.selected) {
                    poiCtx.save();
                    poiCtx.scale(1.2, 1.2);
                    poiCtx.filter = 'invert(100%)';
                    poiCtx.drawImage(img, -16, -16, 32, 32);
                    poiCtx.restore();
                }
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

    class Path {
        static PATHS = [];
        
        constructor(color, direction, startPOI, endPOI) {
            this.color = color;
            this.direction = direction;
            this.startPOI = startPOI;
            this.endPOI = endPOI;
            this.listElement = pathListElement.clone();
            this.listElement.find('.path-color').val(color);
            this.listElement.find('.startPOI').val(startPOI.name);
            this.listElement.find('.endPOI').val(endPOI.name);
            this.listElement.find('.path-color').on('input', () => {
                this.color = this.listElement.find('.path-color').val();
                updatePOIMap();
            });
            this.listElement.find('.direction-icon').on('click', () => {
                this.setDirection(this.direction === "horizontal" ? "vertical" : "horizontal");
            });
            this.listElement.find('.remove-obj').on('click', () => {
                this.listElement.remove();
                Path.PATHS.splice(Path.PATHS.indexOf(this), 1);
                updatePOIMap();
            });
            $('.path-list').append(this.listElement);
            this.listElement.show();
            Path.PATHS.push(this);
        }

        setDirection(direction) {
            this.direction = direction
            if (direction == "horizontal") {
                this.listElement.find('.direction-icon').text('−');
            } else {
                this.listElement.find('.direction-icon').text('│');
            }
            updatePOIMap();
        }

        drawPath() {
            if (!this.startPOI || !this.endPOI) return;
            let x1 = this.startPOI.xOnMap + 0.5;
            let z1 = this.startPOI.zOnMap + 0.5;
            let x2 = this.endPOI.xOnMap + 0.5;
            let z2 = this.endPOI.zOnMap + 0.5;
            mainCtx.strokeStyle = this.color;
            mainCtx.lineWidth = 1;
            mainCtx.beginPath();
            mainCtx.moveTo(x1, z1);
            if (this.direction === "horizontal") {
                mainCtx.lineTo(x2, z1);
            } else {
                mainCtx.lineTo(x1, z2);
            }
            mainCtx.lineTo(x2, z2);
            mainCtx.stroke();
        }
    }

    
    function updatePOIMap() {
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
        let scale;
        if (scaleX < scaleZ) {
            scale = scaleX;
            poiBounds.minX -= edgePadding / scale;
            poiBounds.maxX += edgePadding / scale;
            let zFreeSpace = ((mapZ / scale) - (poiBounds.maxZ - poiBounds.minZ)) / 2;
            poiBounds.minZ -= zFreeSpace;
            poiBounds.maxZ += zFreeSpace;
        } else {
            scale = scaleZ;
            poiBounds.minZ -= edgePadding / scale;
            poiBounds.maxZ += edgePadding / scale;
            let x = ((mapX / scale) - (poiBounds.maxX - poiBounds.minX)) / 2;
            poiBounds.minX -= x;
            poiBounds.maxX += x;
        }
        poiCtx.clearRect(0, 0, poiCanvas.width, poiCanvas.height);
        POI.POIS.forEach(poi => poi.drawPOI(scale, poiBounds));
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        drawCheckeredBackground();
        Path.PATHS.forEach(path => path.drawPath());
    }

    $('#addObjectButton').on('click', function() {
        new POI('', 0, 0, 'white_banner');
        updatePOIMap();
    });
    
    new POI('Start', 64, 64, 'green_banner');
    new POI('End', 32, 96, 'red_banner');
    new POI('Checkpoint', 96, 64, 'blue_banner');
    updatePOIMap();


    class ToolController {
        static currentTool = "auto";
        static selectedPOI = null;

        static clickPOI(poi) {
            if (this.currentTool === "auto") {
                if (!this.selectedPOI) {
                    this.selectedPOI = poi;
                    poi.selected = true;
                    updatePOIMap();
                } else {
                    if (this.selectedPOI !== poi) {
                        let direction = $('.dirButton.selected').attr('id');
                        let lineColor = $('#colorPicker').val();
                        new Path(lineColor, direction, this.selectedPOI, poi);
                    }
                    // Deselect the currently selected POI
                    this.selectedPOI.selected = false;
                    this.selectedPOI = null;
                    poi.selected = false;
                    updatePOIMap();
                    return;
                }
            } else if (this.currentTool === "select") {
                // Select tool behavior
            }
        }
    }
});