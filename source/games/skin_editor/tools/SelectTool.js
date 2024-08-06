import { Tool } from './Tool.js';

export class SelectTool extends Tool {
    constructor(layerList) {
        super(layerList);
        this.selectionCanvas = document.getElementById('selection');
        this.addOption('addTemplateLayer', null);
    }

    clearSelection() {
        this.layerList.selection.fill(false);
        this.updateSelectionCanvas();
    }
    
    updateSelectionCanvas() {
        var g2d = this.selectionCanvas.getContext('2d');
        g2d.clearRect(0, 0, this.selectionCanvas.width, this.selectionCanvas.height);
        g2d.globalAlpha = 0.2;
        for (let i = 0; i < 64; i++) {
            for (let j = 0; j < 64; j++) {
                if (this.layerList.selection[i + j * 64]) {
                    g2d.fillStyle = '#37c4f2';
                    g2d.fillRect(i, j, 1, 1);
                }
            }
        }
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
        this.layerList.selection[point.x + point.y * 64] = !this.layerList.selection[point.x + point.y * 64];
        this.updateSelectionCanvas();
    }

    getBaseColor() {
        let data = this.selectionCanvas.getContext('2d').getImageData(0, 0, 64, 64).data;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                return [data[i], data[i + 1], data[i + 2], data[i + 3]];
            }
        }
        return null;
    }

    addTemplateLayer() {
        let data = this.layerList.currentLayer.canvas.getContext('2d').getImageData(0, 0, 64, 64).data;

        var templateData = new Array(64 * 64 * 4);

        var diff = function (a, b) {
            if (b === 0) {
                return 0;
            }
            return (a - b) / b;
        };

        var baseColor = this.getBaseColor();
        for (let i = 0; i < this.layerList.selection.length; i++) {
            var j = i * 4;
            if (this.layerList.selection[i]) {
                templateData[j] = diff(data[j], baseColor[0]);
                templateData[j + 1] = diff(data[j + 1], baseColor[1]);
                templateData[j + 2] = diff(data[j + 2], baseColor[2]);
                templateData[j + 3] = diff(data[j + 3], baseColor[3]);
            } else {
                templateData[j + 3] = -1;
            }
        }
        this.layerList.addLayer().setTemplate(templateData, baseColor);
    }
}