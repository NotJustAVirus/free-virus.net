import { Tool } from './Tool.js';

export class Eraser extends Tool {
    constructor(layerList) {
        super(layerList);
    }

    click(point, ctrlDown) {
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        g2d.clearRect(point.x, point.y, 1, 1);
        this.layerList.onLayerUdated();
    }
}