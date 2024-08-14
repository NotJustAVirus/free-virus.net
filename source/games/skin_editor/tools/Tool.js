export class Tool {
    options = new Map();

    constructor(layerList) {
        this.layerList = layerList;
    }

    addOption(name, value) {
        this.options.set(name, value);
    }

    getOption(name) {
        return this.options.get(name);
    }

    click(point, event) {
        throw new Error('Not implemented');
    }

    drag(point, event) {
        throw new Error('Not implemented');
    }

    release(point, event) {
        throw new Error('Not implemented');
    }
}