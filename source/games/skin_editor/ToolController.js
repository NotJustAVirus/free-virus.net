import { SelectTool } from './SelectTool.js';
import { LayerList } from './Layer.js';


export class ToolController {
    constructor(mouseListener) {
        this.mouseListener = mouseListener;
        this.layerList = new LayerList();
        this.selectedTool = new SelectTool(this.layerList);
        this.mouseListener.setCallback((point, ctrlDown) => {
            this.selectedTool.click(point, ctrlDown);
        });
    }
}