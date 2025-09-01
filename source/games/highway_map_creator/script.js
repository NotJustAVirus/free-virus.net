
$(document).ready(function(){
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const mainCanvas = document.getElementById('mainCanvas');
    const mainCtx = mainCanvas.getContext('2d');
    const poiCanvas = document.getElementById('poiCanvas');
    const poiCtx = poiCanvas.getContext('2d');
    const poiList = document.getElementById('objectList').querySelector('.poi-list');
    const pathList = document.getElementById('objectList').querySelector('.path-list');

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

    $('#load').on('click', function() {
        let clipboardData = navigator.clipboard.readText();
        clipboardData.then(text => {
            let data = JSON.parse(text);
            let pois = data.pois || [];
            let paths = data.paths || [];
            if (POI.POIS.length > 0 || Path.PATHS.length > 0) {
                if (!confirm("There are already loaded POIs or Paths. Do you want to replace them?")) {
                    return;
                }
                POI.POIS = [];
                $('.poi-list').empty();
                Path.PATHS = [];
                $('.path-list').empty();
            }
            pois.forEach(poiData => {
                let poi = new POI(poiData.name, poiData.x, poiData.z, poiData.banner);
            });
            paths.forEach(pathData => {
                let startPOI = POI.POIS.find(p => p.name === pathData.start);
                let endPOI = POI.POIS.find(p => p.name === pathData.end);
                let path = new Path(pathData.color, pathData.direction, startPOI, endPOI);
            });
            updatePOIMap();
        });
    });

    $('#save').on('click', function() {
        POI.POIS.sort((a, b) => {
            let aIndex = Array.from(poiList.children).indexOf(a.listElement[0]);
            let bIndex = Array.from(poiList.children).indexOf(b.listElement[0]);
            return aIndex - bIndex;
        });
        console.log('Sorted POIs:', POI.POIS);
        let sortedPOIs = POI.POIS.map(poi => poi.data());
        Path.PATHS.sort((a, b) => {
            let aIndex = Array.from(pathList.children).indexOf(a.listElement[0]);
            let bIndex = Array.from(pathList.children).indexOf(b.listElement[0]);
            return aIndex - bIndex;
        });
        let sortedPaths = Path.PATHS.map(path => path.data());
        let data = {
            pois: sortedPOIs,
            paths: sortedPaths
        };
        navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
            console.log('Copied to clipboard');
        });
    });

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

    $('#decreaseXSize').on('click', function() {
        let currentSize = parseInt($('#xSize').val(), 10);
        if (currentSize > 1) {
            $('#xSize').val(currentSize - 1);
            updateMapSize();
        }
    });

    $('#increaseXSize').on('click', function() {
        let currentSize = parseInt($('#xSize').val(), 10);
        $('#xSize').val(currentSize + 1);
        updateMapSize();
    });

    $('#decreaseYSize').on('click', function() {
        let currentSize = parseInt($('#ySize').val(), 10);
        if (currentSize > 1) {
            $('#ySize').val(currentSize - 1);
            updateMapSize();
        }
    });

    $('#increaseYSize').on('click', function() {
        let currentSize = parseInt($('#ySize').val(), 10);
        $('#ySize').val(currentSize + 1);
        updateMapSize();
    });

    $('#zoomIn').on('click', function() {
        let currentZoom = parseFloat($('#zoomLevel').val());
        currentZoom += 0.1;
        $('#zoomLevel').val(parseFloat(currentZoom).toFixed(1));
        $('.mapBox').css('transform', `scale(${currentZoom})`);
    });

    $('#zoomOut').on('click', function() {
        let currentZoom = parseFloat($('#zoomLevel').val());
        if (currentZoom > 0.1) {
            currentZoom -= 0.1;
            $('#zoomLevel').val(parseFloat(currentZoom).toFixed(1));
            $('.mapBox').css('transform', `scale(${currentZoom})`);
        }
    });

    function updateMapSize() {
        let xSize = parseInt($('#xSize').val(), 10);
        let ySize = parseInt($('#ySize').val(), 10);
        backgroundCanvas.width = xSize * 58 + 6;
        backgroundCanvas.height = ySize * 58 + 6;
        mainCanvas.width = xSize * 128;
        mainCanvas.height = ySize * 128;
        poiCanvas.width = xSize * 512;
        poiCanvas.height = ySize * 512;
        drawMap();
        updatePOIMap();
        let scale = 1 / Math.max(xSize, ySize);
        $('#poiCanvas').css('transform', `scale(${scale})`);
        $('#mainCanvas').css('transform', `scale(${scale * 4})`);
        let backgroundScale = (64 * Math.max(xSize, ySize)) / (58 * Math.max(xSize, ySize)) * 8 * scale;
        $('#backgroundCanvas').css('transform', `scale(${backgroundScale})`);
        $('.mapBox').css('width', `${xSize * 600 * scale}px`);
        $('.mapBox').css('height', `${ySize * 600 * scale}px`);
    }

    $('#exportMap').on('click', function() {
        let dataURL = exportTemplate();
        let link = document.createElement('a');
        link.href = dataURL;
        link.download = 'map_template.png';
        link.click();
    });

    function exportTemplate() {
        let exportCanvas = document.createElement('canvas');
        exportCanvas.width = mainCanvas.width;
        exportCanvas.height = mainCanvas.height;
        let exportCtx = exportCanvas.getContext('2d');
        exportCtx.fillStyle = 'white';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        exportCtx.drawImage(mainCanvas, 0, 0);
        for (let x = 0; x < exportCanvas.width; x += 16) {
            for (let y = 0; y < exportCanvas.height; y += 16) {
                let color = (x + y) % 32 === 0 ? '#f0f0f055' : '#00000055';
                exportCtx.fillStyle = color;
                exportCtx.fillRect(x, y, 16, 16);
            }
        }
        for (let x = 0; x < exportCanvas.width; x++) {
            for (let y = 0; y < exportCanvas.height; y++) {
                let color = (x + y) % 2 === 0 ? '#00000000' : '#00000044';
                exportCtx.fillStyle = color;
                exportCtx.fillRect(x, y, 1, 1);
            }
        }
        return exportCanvas.toDataURL();
    }

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
            for (let x = 0; x < backgroundCanvas.width - 6; x += 58) {
                for (let y = 0; y < backgroundCanvas.height - 6; y += 58) {
                    backgroundCtx.drawImage(img, x, y, img.width, img.height);
                }
            }
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

        data() {
            return {
                name: this.name,
                x: this.x,
                z: this.z,
                banner: this.banner
            };
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

        data() {
            return {
                color: this.color,
                direction: this.direction,
                start: this.startPOI ? this.startPOI.name : null,
                end: this.endPOI ? this.endPOI.name : null
            };
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
        poiCtx.imageSmoothingEnabled = false;
        POI.POIS.forEach(poi => poi.drawPOI(scale, poiBounds));
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        // drawCheckeredBackground();
        Path.PATHS.forEach(path => path.drawPath());
    }

    $('#addObjectButton').on('click', function() {
        new POI('', 0, 0, 'white_banner');
        updatePOIMap();
    });
    
    new POI('Start', 64, 64, 'green_banner');
    new POI('End', 32, 96, 'red_banner');
    new POI('Checkpoint', 96, 64, 'blue_banner');
    updateMapSize();


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