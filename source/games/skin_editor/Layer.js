export class LayerList {
    selection = new Array(64 * 64).fill(false);

    constructor() {
        this.layers = [];
        this.layerList = $('#layer-list-content');
        this.currentLayer = null;

        let temp = this;
        $('#add-layer').click(() => {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/png';
            input.click();
            input.onchange = function() {
                let file = this.files[0];
                let reader = new FileReader();
                reader.onload = function() {
                    let img = new Image();
                    img.src = reader.result;
                    img.onload = function() {
                        temp.addLayer().setImage(img);
                    };
                };
                reader.readAsDataURL(file);
            };
        });
        $('#add-layer-by-username').click(() => {
            let username = $('#username').val();
            let img = new Image();
            img.src = 'https://crafthead.net/skin/' + username;
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                temp.addLayer().setImage(img);
            };
        });
        $('#download').click(() => {
            var canvas = document.createElement('canvas');
            var g2d = canvas.getContext('2d');
            this.layers.forEach(layer => {
                layer.drawLayer(g2d);
            });
            $('#download')[0].href = canvas.toDataURL('image/png');
            $('#download')[0].download = $('#download-name').val();
        });
        $('#undo').click(() => {
            this.currentLayer.loadLastHistory();
            this.onLayerUdated();
        });
    }

    setCurrentLayer(layer) {
        if (this.currentLayer) {
            this.currentLayer.element.removeClass('selected');
        }
        this.currentLayer = layer;
        layer.element.addClass('selected');
    }

    addLayer() {
        let layer = new Layer(this);
        this.layers.push(layer);
        this.layerList.prepend(layer.element);
        this.setCurrentLayer(layer);
        return layer;
    }

    removeLayer(layer) {
        this.layers.splice(this.layers.indexOf(layer), 1);
        layer.element.remove();
        if (this.currentLayer === layer) {
            this.setCurrentLayer(this.layers[this.layers.length - 1]);
        }
        this.onLayerUdated();
    }

    moveLayerUp(layer) {
        let index = this.layers.indexOf(layer);
        if (index === this.layers.length - 1) {
            return;
        }
        this.layers.splice(index, 1);
        this.layers.splice(index + 1, 0, layer);
        this.reorderLayers();
        this.onLayerUdated();
    }

    moveLayerDown(layer) {
        let index = this.layers.indexOf(layer);
        if (index === 0) {
            return;
        }
        this.layers.splice(index, 1);
        this.layers.splice(index - 1, 0, layer);
        this.reorderLayers();
        this.onLayerUdated();
    }

    reorderLayers() {
        this.layers.forEach(layer => {
            this.layerList.prepend(layer.element);
        });
    }

    setCallOnUpdate(callback) {
        this.callOnUpdate = callback;
    }

    onLayerUdated() {
        var g2d = $('#skin')[0].getContext('2d');
        g2d.globalAlpha = 1;
        g2d.clearRect(0, 0, 64, 64);
        this.layers.forEach(layer => {
            layer.drawLayer(g2d);
        });
        g2d.drawImage($('#selection')[0], 0, 0);
        if (this.callOnUpdate) {
            this.callOnUpdate();
        }
    }
}

export class Layer {
    constructor(layerList) {
        this.layerList = layerList;
        this.history = [];
        // create html element
        this.element = $('#dummy').find('.layer').clone();
        let temp = this;
        this.element.find('.delete-layer').click(function() {
            layerList.removeLayer(temp);
        });
        this.element.click(function() {
            layerList.setCurrentLayer(temp);
        });
        this.visibleCheckbox = this.element.find('#layer-visibility');
        this.opacitySlider = this.element.find('#layer-opacity');
        this.upButton = this.element.find('.up-layer');
        this.downButton = this.element.find('.down-layer');
        this.element.find('#layer-basecolor').hide();
        this.visibleCheckbox.change(() => {
            layerList.onLayerUdated();
        });
        this.opacitySlider.change(() => {
            layerList.onLayerUdated();
        });
        this.upButton.click(() => {
            layerList.moveLayerUp(this);
        });
        this.downButton.click(() => {
            layerList.moveLayerDown(this);
        });
        this.canvas = this.element.find('canvas')[0];
    }

    drawLayer(ctx) {
        if (this.visibleCheckbox.prop('checked')) {
            ctx.globalAlpha = this.opacitySlider.val();
            ctx.drawImage(this.canvas, 0, 0);
        }
    }

    saveToHistory() {
        let g2d = this.canvas.getContext('2d');
        this.history.push(g2d.getImageData(0, 0, 64, 64));
    }

    loadLastHistory() {
        let g2d = this.canvas.getContext('2d');
        this.history.pop();
        g2d.putImageData(this.history[this.history.length - 1], 0, 0);
    }

    setImage(img) {
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        this.saveToHistory();
        this.layerList.onLayerUdated();
    }

    setTemplate(data, baseColor) {
        console.log('setTemplate', data, baseColor);
        this.templateData = data;
        this.baseColor = baseColor;
        this.element.find('#layer-basecolor').show();
        this.element.find('#layer-basecolor').on('change', () => {
            var g2d = this.canvas.getContext('2d');
            var color = this.element.find('#layer-basecolor').val();
            color = color.substring(0, 7) + 'ff';
            color = this.hexColorToColor(color);
            g2d.clearRect(0, 0, 64, 64);
            var calcNewColor = function (a, b) {
                return a + a * b;
            }
            for (let i = 0; i < data.length; i += 4) {
                var opacity = calcNewColor(color[3], data[i + 3]);
                if (opacity === 0) {
                    continue;
                }
                g2d.globalAlpha = opacity / 255;
                g2d.fillStyle = 'rgb(' + 
                    calcNewColor(color[0], data[i]) + ',' + 
                    calcNewColor(color[1], data[i + 1]) + ',' + 
                    calcNewColor(color[2], data[i + 2]) + ')';
                var pixel = i / 4;
                g2d.fillRect(pixel % 64, Math.floor(pixel / 64), 1, 1);
            }
            saveToHistory();
            this.layerList.onLayerUdated();
        });
        this.element.find('#layer-basecolor').val(this.colorToHex(baseColor).substring(0, 7));
        this.element.find('#layer-basecolor').change();
    }

    colorToHex(color) {
        return '#' + color[0].toString(16).padStart(2, '0') + color[1].toString(16).padStart(2, '0') + color[2].toString(16).padStart(2, '0') + color[3].toString(16).padStart(2, '0');
    }

    hexColorToColor(hex) {
        return [parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3, 5), 16), parseInt(hex.substring(5, 7), 16), parseInt(hex.substring(7, 9), 16)];
    }
}