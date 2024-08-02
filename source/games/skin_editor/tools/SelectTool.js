import { Tool } from './Tool.js';

export class SelectTool extends Tool {
    constructor(layerList) {
        super(layerList);
        this.selection = document.getElementById('selection');
        this.addOption('addTemplateLayer', null);
    }

    clearSelection() {
        var g2d = this.selection.getContext('2d');
        g2d.clearRect(0, 0, this.selection.width, this.selection.height);
        this.layerList.onLayerUdated();
    }

    click(point, ctrlDown) {
        if (point == null) {
            this.clearSelection();
            return;
        }
        if (!ctrlDown) {
            this.clearSelection();
        }
        var g2d = this.selection.getContext('2d');
        if (g2d.getImageData(point.x, point.y, 1, 1).data[3] > 0) {
            g2d.clearRect(point.x, point.y, 1, 1);
        } else {
            g2d.fillStyle = '#37c4f2';
            g2d.fillRect(point.x, point.y, 1, 1);
        }
        this.layerList.onLayerUdated();
    }

    getBaseColor() {
        let data = this.selection.getContext('2d').getImageData(0, 0, 64, 64).data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                return [data[i], data[i + 1], data[i + 2], data[i + 3]];
            }
        }
        return null;
    }

    addTemplateLayer() {
        let data = this.selection.getContext('2d').getImageData(0, 0, 64, 64).data;
        let data2 = this.layerList.currentLayer.canvas.getContext('2d').getImageData(0, 0, 64, 64).data;

        var baseColor = this.getBaseColor();
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                data[i] = data2[i] - baseColor[0];
                data[i + 1] = data2[i + 1] - baseColor[1];
                data[i + 2] = data2[i + 2] - baseColor[2];
                data[i + 3] = data2[i + 3] - baseColor[3];
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 69; //-baseColor[3];
            }
        }
        this.layerList.addLayer().setTemplate(data, baseColor);
    }
}