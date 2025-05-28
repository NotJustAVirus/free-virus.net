import { Tool } from './Tool.js';

export class ColorPicker extends Tool {
    constructor(layerList, colorSelector) {
        super(layerList)
        this.colorSelector = colorSelector;
        this.addOption('sampling', 'layer');
    }

    click(point, evnet) {
        if (point == null) {
            return;
        }
        if (this.getOption('sampling') === 'layer') {
            var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        } else if (this.getOption('sampling') === 'global') {
            var g2d = $('#skin').get(0).getContext('2d'); // TODO: fix this
        }
        var data = g2d.getImageData(point.x, point.y, 1, 1).data;
        this.colorSelector.setColorFromRGBA(data[0], data[1], data[2], data[3]);
        this.layerList.onLayerUpdated();
    }

    drag(point, event) {
        // do nothing
    }

    release(point, event) {
        // do nothing
    }
}