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

        var templateData = new Array(64 * 64 * 4);

        var diff = function (a, b) {
            if (b === 0) {
                return 0;
            }
            return (a - b) / b;
        };

        var baseColor = this.getBaseColor();
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                templateData[i] = diff(data2[i], baseColor[0]);
                templateData[i + 1] = diff(data2[i + 1], baseColor[1]);
                templateData[i + 2] = diff(data2[i + 2], baseColor[2]);
                templateData[i + 3] = diff(data2[i + 3], baseColor[3]);
            } else {
                templateData[i + 3] = -1;
            }
        }
        this.layerList.addLayer().setTemplate(templateData, baseColor);
    }
}