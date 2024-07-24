import { SkinMapper } from "./SkinMapper.js";

export class SelectTool {
    constructor(layerList) {
        this.layerList = layerList;
        this.selection = document.getElementById('selection');
        this.magicWand = new MagicWand(this.selection, this.layerList);
    }

    clear() {
        var g2d = this.selection.getContext('2d');
        g2d.clearRect(0, 0, this.selection.width, this.selection.height);
        this.layerList.onLayerUdated();
    }

    click(point, ctrlDown) {
        this.magicWand.click(point, ctrlDown);
        return;
        if (!ctrlDown) {
            this.clear();
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
}

class MagicWand {
    tolerance = 0.10;
    foodGlobal = true;

    constructor(selection, layerList) {
        this.selection = selection;
        this.layerList = layerList;
        this.skinMapper = new SkinMapper();
        this.selectedColor = [0, 0, 0, 0];
    }

    click(point, ctrlDown) {
        if (!ctrlDown) {
            this.clear();
        }
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        this.data = g2d.getImageData(0, 0, 64, 64).data;
        this.selectedColor = this.getColor(point.x, point.y);
        if (this.foodGlobal) {
            for (let i = 0; i < 64; i++) {
                for (let j = 0; j < 64; j++) {
                    if (!this.skinMapper.onSkin({ x: i, y: j })) {
                        continue;
                    }
                    if (this.colorDistance(this.getColor(i, j), this.selectedColor) > this.tolerance) {
                        continue;
                    }
                    var g2d = this.selection.getContext('2d');
                    g2d.fillStyle = '#37c4f2';
                    g2d.fillRect(i, j, 1, 1);
                }
            }
        } else {
            this.floodFill(point.x, point.y);
        }
        this.layerList.onLayerUdated();
    }

    clear() {
        var g2d = this.selection.getContext('2d');
        g2d.clearRect(0, 0, this.selection.width, this.selection.height);
        this.layerList.onLayerUdated();
    }

    floodFill(x, y) {
        if (this.isSelection(x, y)) {
            return;
        }
        var color = this.getColor(x, y);
        if (this.colorDistance(color, this.selectedColor) > this.tolerance) {
            return;
        }
        var g2d = this.selection.getContext('2d');
        g2d.fillStyle = '#37c4f2';
        g2d.fillRect(x, y, 1, 1);
        var point = this.skinMapper.moveX({ x: x, y: y }, false);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveX({ x: x, y: y }, true);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveY({ x: x, y: y }, false);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveY({ x: x, y: y }, true);
        this.floodFill(point.x, point.y);
    }

    colorDistance(color1, color2) {
        var diff = Math.sqrt(Math.pow(color1[0] - color2[0], 2) + Math.pow(color1[1] - color2[1], 2) + Math.pow(color1[2] - color2[2], 2));
        return diff / 441.6729559300637;
    }

    isSelection(x, y) {
        return this.selection.getContext('2d').getImageData(x, y, 1, 1).data[3] > 0;
    }

    getColor(x, y) {
        var index = (y * 64 + x) * 4;
        return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]];
    }
}