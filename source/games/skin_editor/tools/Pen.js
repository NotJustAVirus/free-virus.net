import { Tool } from './Tool.js';

export class Pen extends Tool {
    constructor(layerList) {
        super(layerList);
    }

    click(point, ctrlDown) {
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        g2d.globalAlpha = $('#A').val() / 255;
        g2d.fillStyle = $('#color').val();
        g2d.fillRect(point.x, point.y, 1, 1);
        this.layerList.onLayerUdated();
    }
}