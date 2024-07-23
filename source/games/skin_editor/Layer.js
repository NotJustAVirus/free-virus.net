export class LayerList {
    constructor() {
        this.layers = [];
        this.layerList = $('#layer-list-content');

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
    }

    addLayer() {
        let layer = new Layer(this);
        this.layers.push(layer);
        this.layerList.append(layer.element);
        return layer;
    }

    removeLayer(layer) {
        this.layers.splice(this.layers.indexOf(layer), 1);
        layer.element.remove();
        this.onLayerUdated();
    }

    setCallOnUpdate(callback) {
        this.callOnUpdate = callback;
    }

    onLayerUdated() {
        var g2d = $('#skin')[0].getContext('2d');
        g2d.globalAlpha = 1;
        g2d.clearRect(0, 0, 64, 64);
        this.layers.forEach(layer => {
            g2d.drawImage(layer.canvas, 0, 0);
        });
        g2d.globalAlpha = 0.2;
        g2d.drawImage($('#selection')[0], 0, 0);
        if (this.callOnUpdate) {
            this.callOnUpdate();
        }
    }
}

export class Layer {
    constructor(layerList) {
        this.layerList = layerList;
        // create html element
        this.element = $('#dummy').find('.layer').clone();
        this.element.find('.layer-name').text('Layer ' + ($('#layer-list-content').children().length + 1));
        let temp = this;
        this.element.find('.delete-layer').click(function() {
            layerList.removeLayer(temp);
        });
        this.canvas = this.element.find('canvas')[0];
    }

    setImage(img) {
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        this.layerList.onLayerUdated();
    }
}