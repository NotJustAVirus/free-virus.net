import { SkinMapper } from "./SkinMapper.js";

export class FloodFiller {

    constructor(data, tolerance, floodMode) {
        this.data = data;
        this.tolerance = tolerance;
        this.floodMode = floodMode;
        this.skinMapper = new SkinMapper();
        this.selectedColor = [0, 0, 0, 0];
        this.selection = new Array(64 * 64).fill(false);
    }

    startFloodFill(point) {
        this.selectedColor = this.getColor(point.x, point.y);
        if (this.floodMode === "global") {
            for (let i = 0; i < 64; i++) {
                for (let j = 0; j < 64; j++) {
                    if (!this.skinMapper.onSkin({ x: i, y: j })) {
                        continue;
                    }
                    if (this.colorDistance(this.getColor(i, j), this.selectedColor) > this.tolerance) {
                        continue;
                    }
                    this.selection[i + j * 64] = true;
                }
            }
        } else {
            this.floodFill(point.x, point.y);
        }
        return this.selection;
    }

    floodFill(x, y) {
        if (this.selection[x + y * 64]) {
            return;
        }
        var color = this.getColor(x, y);
        if (this.colorDistance(color, this.selectedColor) > this.tolerance) {
            return;
        }
        this.selection[x + y * 64] = true;
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

    colorDistance(color1, color2) {
        var diff = Math.sqrt(Math.pow(color1[0] - color2[0], 2) + Math.pow(color1[1] - color2[1], 2) + Math.pow(color1[2] - color2[2], 2));
        var opacityDiff = 1 - Math.abs(color1[3] - color2[3]) / 255;
        diff /= 441.6729559300637;
        diff /= opacityDiff;
        return diff;
    }

    getColor(x, y) {
        var index = (x + y * 64) * 4;
        return [this.data[index], this.data[index + 1], this.data[index + 2], this.data[index + 3]];
    }
}