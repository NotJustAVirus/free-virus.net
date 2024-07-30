import * as THREE from 'three';


export class MouseListener {
	constructor(window, camera, world, controls) {
		this.window = window;
		this.camera = camera;
		this.world = world;
        this.controls = controls;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		this.window.addEventListener('click', this.click.bind(this));
		this.window.addEventListener('mousedown', this.mouseDown.bind(this));
        this.window.addEventListener('mouseup', this.mouseUp.bind(this));
        this.callback = null;
	}

	mouseDown(event) {
		event.preventDefault();

		this.mouse.x = (event.offsetX / this.window.scrollWidth) * 2 - 1;
		this.mouse.y = - (event.offsetY / this.window.scrollHeight) * 2 + 1;

        var intersects = this.raycast();

        if (intersects.length > 0) {
            console.log(intersects);
            this.controls.enabled = false;
        }
	}

    mouseUp(event) {
        this.controls.enabled = true
    }

	click(event) {
		event.preventDefault();

		if (!((event.offsetX / this.window.scrollWidth) * 2 - 1 == this.mouse.x && - (event.offsetY / this.window.scrollHeight) * 2 + 1 == this.mouse.y)) {
			return;
		}

		var intersects = this.raycast();

		if (intersects.length > 0) {
            var i = 0;
            for (; i < intersects.length; i++) {
                if (intersects[i].object.parent.visible == false) {
                    continue;
                }
                break;
            }
            var point = intersects[i].uv;
            point.x = Math.floor(point.x * 64);
            point.y = 63 - Math.floor(point.y * 64);
            if (this.callback) {
                this.callback(point, event.ctrlKey);
            }
		} else {
            this.callback(null, event.ctrlKey);
        }
	}

    raycast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

		return this.raycaster.intersectObjects(this.world.children);
    }

    setCallback(callback) {
        this.callback = callback;
    }

}