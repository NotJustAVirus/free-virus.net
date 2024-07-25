import { SelectTool } from './tools/SelectTool.js';
import { MagicWand } from './tools/MagicWand.js';
import { LayerList } from './Layer.js';


export class ToolController {
    tools = {
        select: SelectTool,
        magicWand: MagicWand,
    };
    
    constructor(mouseListener) {
        this.mouseListener = mouseListener;
        this.layerList = new LayerList();
        this.setTool(new SelectTool(this.layerList));
        this.mouseListener.setCallback((point, ctrlDown) => {
            this.selectedTool.click(point, ctrlDown);
        });
        $('#selectedTool').find('.value').change(() => {
            this.setTool(new this.tools[$('#selectedTool').find('.value').val()](this.layerList));
        });
        $('.toolbar-section').find('.value').change((event) => {
            var option = $(event.target).attr('id');
            var value = $(event.target).val();
            option = option.replace('Value', '');
            if (this.selectedTool.options.has(option)) {
                this.selectedTool.options.set(option, value);
            }
        });
    }

    setTool(tool) {
        this.selectedTool = tool;
        $('.toolbar-section').hide();
        $('#selectedTool').show();
        for (let option of tool.options.keys()) {
            $('#' + option).show();
            $('#' + option + 'Value').val(tool.options.get(option));
        }
    }
}