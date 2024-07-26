import { SkinMapper } from "../SkinMapper.js";
import { SelectTool } from "./SelectTool.js";

export class MagicWand extends SelectTool{

    constructor(layerList) {
        super(layerList);
        this.skinMapper = new SkinMapper();
        this.selectedColor = [0, 0, 0, 0];
        this.addOption('tolerance', 0.10);
        this.addOption('floodMode', "global");
    }

    click(point, ctrlDown) {
        if (point == null) {
            this.clearSelection();
            return;
        }
        if (!ctrlDown) {
            this.clearSelection();
        }
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        this.data = g2d.getImageData(0, 0, 64, 64).data;
        this.selectedColor = this.getColor(point.x, point.y);
        if (this.getOption('floodMode') === "global") {
            for (let i = 0; i < 64; i++) {
                for (let j = 0; j < 64; j++) {
                    if (!this.skinMapper.onSkin({ x: i, y: j })) {
                        continue;
                    }
                    if (this.colorDistance(this.getColor(i, j), this.selectedColor) > this.getOption('tolerance')) {

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

    floodFill(x, y) {
        if (this.isSelection(x, y)) {
            return;
        }
        var color = this.getColor(x, y);
        if (this.colorDistance(color, this.selectedColor) > this.getOption('tolerance')) {
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