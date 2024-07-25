import { Tool } from './Tool.js';

export class Pen extends Tool {
    constructor(layerList) {
        super(layerList);
        this.addOption('color', '#37c4f2');
    }

    click(point, ctrlDown) {
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        g2d.fillStyle = this.getOption('color');
        g2d.fillRect(point.x, point.y, 1, 1);
        this.layerList.onLayerUdated();
    }
}