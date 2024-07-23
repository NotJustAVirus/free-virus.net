export class SelectTool {
    constructor(layerList) {
        this.layerList = layerList;
        this.selection = document.getElementById('selection');
    }

    clear() {
        var g2d = this.selection.getContext('2d');
        g2d.clearRect(0, 0, this.selection.width, this.selection.height);
        this.layerList.onLayerUdated();
    }

    click(point) {
        if (point.x < 0 || point.y < 0 || point.x >= 64 || point.y >= 64) {
            return;
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