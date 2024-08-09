import * as THREE from 'three';


export class MouseListener {
	constructor(window, camera, world, controls) {
		this.window = window;
		this.camera = camera;
		this.world = world;
        this.controls = controls;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		// this.window.addEventListener('click', this.click.bind(this));
		this.window.addEventListener('mousedown', this.mouseDown.bind(this));
        this.window.addEventListener('mousemove', this.mouseMove.bind(this));
        this.window.addEventListener('mouseup', this.mouseUp.bind(this));
        this.callback = null;
        this.drawing = false;
	}

	mouseDown(event) {
        event.preventDefault();
        
		this.mouse = this.getMouseCoords(event);
        
        var intersects = this.raycast();
        
        if (intersects.length > 0) {
            this.controls.enabled = false;
            this.drawing = true;        
            var point = this.getIntersectPoint(intersects);
            this.lastPoint = point;
            if (this.callback) {
                this.callback(point, event.ctrlKey);
            }
        }
	}

    mouseMove(event) {
        if (!this.drawing) {
            return;
        }
        this.mouse = this.getMouseCoords(event);
        var intersects = this.raycast();

        if (intersects.length > 0) {
            var point = this.getIntersectPoint(intersects);
            if (point == null) {
                return;
            }
            if (this.lastPoint && point.x == this.lastPoint.x && point.y == this.lastPoint.y) {
                return;
            }
            this.lastPoint = point;
            if (this.callback) {
                this.callback(point, event.ctrlKey);
            }
        }
    }

    mouseUp(event) {
        this.drawing = false;
        var mouse = this.getMouseCoords(event);
        var intersects = this.raycast();

        if (intersects.length == 0) {
            if (mouse.x == this.mouse.x || mouse.y == this.mouse.y) {
                this.callback(null, event.ctrlKey);
            }
        }

        this.controls.enabled = true
    }

    getMouseCoords(event) {
        var mouseX = (event.offsetX / this.window.scrollWidth) * 2 - 1;
        var mouseY = - (event.offsetY / this.window.scrollHeight) * 2 + 1;
        return {x: mouseX, y: mouseY};
    }

    raycast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

		return this.raycaster.intersectObjects(this.world.children);
    }

    setCallback(callback) {
        this.callback = callback;
    }

    getIntersectPoint(intersects) {
        var i = 0;
        let targetMethod = $('#target').val();
        for (; i < intersects.length; i++) {
            if (targetMethod != 'all' && intersects[i].object.parent.visible == false) {
                continue;
            }
            var point = intersects[i].uv;
            point.x = Math.floor(point.x * 64);
            point.y = 63 - Math.floor(point.y * 64);
            if (targetMethod == 'noneTransparent') {
                var g2d = $('#skin').get(0).getContext('2d');
                var data = g2d.getImageData(point.x, point.y, 1, 1).data;
                if (data[3] == 0) {
                    continue;
                }
            }
            return point;
        }
        return null;
    }
}