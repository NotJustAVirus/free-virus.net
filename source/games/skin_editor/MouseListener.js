import * as THREE from 'three';
import { Player } from './Player.js';


export class MouseListener {
	constructor(window, camera, world) {
		this.window = window;
		this.camera = camera;
		this.world = world;
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		this.window.addEventListener('click', this.click.bind(this));
		this.window.addEventListener('mousedown', this.mouseDown.bind(this));
	}

	mouseDown(event) {
		event.preventDefault();
	
		this.mouse.x = (event.offsetX / this.window.scrollWidth) * 2 - 1;
		this.mouse.y = - (event.offsetY / this.window.scrollHeight) * 2 + 1;
	}

	click(event) {
		event.preventDefault();

		if (!((event.offsetX / this.window.scrollWidth) * 2 - 1 == this.mouse.x && - (event.offsetY / this.window.scrollHeight) * 2 + 1 == this.mouse.y)) {
			return;
		}

		this.raycaster.setFromCamera(this.mouse, this.camera);

		var intersects = this.raycaster.intersectObjects(this.world.children);

		if (intersects.length > 0) {
			// var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
			// sphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
			// this.world.add(sphere);
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
            var g2d = $('#skin')[0].getContext('2d');
            g2d.fillStyle = '#FF0000';
            g2d.fillRect(point.x, point.y, 1, 1);
            this.world.children.forEach(child => {
                if (child instanceof Player) {
                    child.updateTexture();
                }
            });
		}
	}
}