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
                    this.layerList.selection[i + j * 64] = true;
                }
            }
        } else {
            this.floodFill(point.x, point.y);
        }
        this.updateSelectionCanvas();
    }

    floodFill(x, y) {
        if (this.layerList.selection[x + y * 64]) {
            return;
        }
        var color = this.getColor(x, y);
        if (this.colorDistance(color, this.selectedColor) > this.getOption('tolerance')) {
            return;
        }
        this.layerList.selection[x + y * 64] = true;
        var point = this.skinMapper.moveX({ x: x, y: y }, false);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveX({ x: x, y: y }, true);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveY({ x: x, y: y }, false);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.moveY({ x: x, y: y }, true);
        this.floodFill(point.x, point.y);
        point = this.skinMapper.pointOnOppositeLayer({ x: x, y: y });
        this.floodFill(point.x, point.y);
    }

    getBaseColor() {
        return this.selectedColor;
    }

    colorDistance(color1, color2) {
        var diff = Math.sqrt(Math.pow(color1[0] - color2[0], 2) + Math.pow(color1[1] - color2[1], 2) + Math.pow(color1[2] - color2[2], 2));
        return diff / 441.6729559300637;
    }

    getColor(x, y) {
        var index = (y * 64 + x) * 4;
        return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]];
    }
}