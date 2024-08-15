import { Pen } from './tools/Pen.js';
import { Eraser } from './tools/Eraser.js';
import { SelectTool } from './tools/SelectTool.js';
import { MagicWand } from './tools/MagicWand.js';
import { LayerList } from './Layer.js';
import { ColorPicker } from './tools/ColorPicker.js';
import { FillTool } from './tools/FillTool.js';
import { ColorSelector } from './ColorSelector.js';


export class ToolController {
    tools = {
        pen: Pen,
        erase: Eraser,
        select: SelectTool,
        magicWand: MagicWand,
        colorPicker: ColorPicker,
        fill: FillTool,
    };
    
    constructor(mouseListener) {
        this.mouseListener = mouseListener;
        this.layerList = new LayerList();
        this.setTool("select");
        this.mouseListener.callback = (type, point, event) => {
            this.selectedTool[type](point, event);
        };
        $('#selectedTool').find('.value').change(() => {
            this.setTool($('#selectedTool').find('.value').val());
        });
        $('.toolbar-section').find('.value').change((event) => {
            var option = $(event.target).attr('id');
            var value = $(event.target).val();
            option = option.replace('Value', '');
            if (this.selectedTool.options.has(option)) {
                this.selectedTool.options.set(option, value);
            }
        });
        this.colorSelector = new ColorSelector();
    }

    setTool(tool) {
        // if (this.selectedTool != null) {
        //     this.selectedTool.onDeselect();
        // }
        if (this.tools[tool] instanceof Function) {
            if (this.tools[tool] === ColorPicker) {
                this.tools[tool] = new this.tools[tool](this.layerList, this.colorSelector);
            } else {
                this.tools[tool] = new this.tools[tool](this.layerList);
            }
        }
        this.selectedTool = this.tools[tool];
        $('.toolbar-section').hide();
        $('.toolbar-section:not(#selectedTool)').find('.value').off('change');
        $('button.value').off('click');
        $('#selectedTool').show();
        $('#undo-section').show(); // TODO: fix this
        for (let option of this.selectedTool.options.keys()) {
            $('#' + option).show();
            $('#' + option + 'Value').val(this.selectedTool.options.get(option));
            $('#' + option + 'Value').on('change', (event) => {
                console.log(event);
                this.selectedTool.options.set(option, $('#' + option + 'Value').val());
            });
            if ($('#' + option + 'Value').is('button')) {
                $('#' + option + 'Value').click(() => {
                    this.selectedTool[option]();
                });
            }
        }
    }
}