import { FloodFiller } from "../FloodFiller.js";
import { Tool } from './Tool.js';

export class FillTool extends Tool{

    constructor(layerList) {
        super(layerList);
        this.addOption('tolerance', 0.10);
        this.addOption('floodMode', "contiguous");
    }

    click(point, ctrlDown) {
        if (point == null) {
            return;
        }
        var g2d = this.layerList.currentLayer.canvas.getContext('2d');
        this.data = g2d.getImageData(0, 0, 64, 64).data;
        let floodFiller = new FloodFiller(this.data, this.getOption('tolerance'), this.getOption('floodMode'));
        this.selection = floodFiller.startFloodFill(point);
        
        for (let i = 0; i < this.selection.length; i++) {
            if (this.selection[i]) {
                let x = i % 64;
                let y = Math.floor(i / 64);
                g2d.globalAlpha = $('#A').val() / 255;
                g2d.fillStyle = $('#color').val();
                g2d.fillRect(x, y, 1, 1);
            }
        }

        this.layerList.onLayerUdated();
    }
}