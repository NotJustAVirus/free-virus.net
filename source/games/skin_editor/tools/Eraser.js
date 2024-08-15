import { Tool } from './Tool.js';

export class Eraser extends Tool {
    constructor(layerList) {
        super(layerList);
    }

    erase(point) {
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        g2d.clearRect(point.x, point.y, 1, 1);
        this.layerList.onLayerUdated();
    }

    click(point, event) {
        if (point == null) {
            return;
        }
        this.erase(point);
    }

    drag(point, event) {
        if (point == null) {
            return;
        }
        this.erase(point);
    }

    release(point, event) {
        this.layerList.currentLayer.saveToHistory();
    }
}