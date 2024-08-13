import { FloodFiller } from "../FloodFiller.js";
import { SelectTool } from "./SelectTool.js";

export class MagicWand extends SelectTool{

    constructor(layerList) {
        super(layerList);
        this.selectedColor = [0, 0, 0, 0];
        this.addOption('tolerance', 0.10);
        this.addOption('floodMode', "global");
    }

    click(point, ctrlDown) {
        if (point == null) {
            this.clearSelection();
            return;
        }
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        this.data = g2d.getImageData(0, 0, 64, 64).data;
        let floodFiller = new FloodFiller(this.data, this.getOption('tolerance'), this.getOption('floodMode'));
        this.selection = floodFiller.startFloodFill(point);
        if (ctrlDown) {
            for (let i = 0; i < this.layerList.selection.length; i++) {
                this.layerList.selection[i] = this.layerList.selection[i] || this.selection[i];
            }
        } else {
            this.clearSelection();
            this.layerList.selection = this.selection;
        }
        this.updateSelectionCanvas();
    }
}