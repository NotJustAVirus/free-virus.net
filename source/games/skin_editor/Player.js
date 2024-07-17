import * as THREE from 'three';


export class Player extends THREE.Object3D {

    constructor(skincanvas) {
        super();
        // var cube = this;
        // cube.position.set(position.x, position.y, position.z);
        // this.type = material.name;
        // this.state = material.state;
        // this.geometry = new THREE.BoxGeometry(1, 1, 1);
        // var texture = World.loadTexture(this.type);
        // texture.then((texture) => {
        //     cube.material = new THREE.MeshStandardMaterial({ map: texture });
        //     cube.mesh = new THREE.Mesh(cube.geometry, cube.material);
        //     cube.add(cube.mesh);
        // });

        var canvasTexture = new THREE.CanvasTexture(skincanvas);
        canvasTexture.colorSpace = THREE.SRGBColorSpace;
        canvasTexture.magFilter = THREE.NearestFilter;

        var plane = new THREE.PlaneGeometry(8, 8);
        // plane.rotateX(-Math.PI / 2);
        // plane.translate(0, 0, 0);
        plane.attributes.uv.array[0] = 8/64;
        plane.attributes.uv.array[1] = (64 - 8)/64;
        plane.attributes.uv.array[2] = 16/64;
        plane.attributes.uv.array[3] = (64 - 8)/64;
        plane.attributes.uv.array[4] = 8/64;
        plane.attributes.uv.array[5] = (64 - 16)/64;
        plane.attributes.uv.array[6] = 16/64;
        plane.attributes.uv.array[7] = (64 - 16)/64;
        var material = new THREE.MeshBasicMaterial({ map: canvasTexture, side: THREE.DoubleSide });
        // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var mesh = new THREE.Mesh(plane, material);
        this.add(mesh);

        var rightArm = new THREE.Object3D();
        var leftArm = new THREE.Object3D();
        var rightLeg = new THREE.Object3D();
        var leftLeg = new THREE.Object3D();
        var head = new THREE.Object3D();
        var body = new THREE.Object3D();
        var player = new THREE.Object3D();
        player.add(rightArm);
        player.add(leftArm);
        player.add(rightLeg);
        player.add(leftLeg);
        player.add(head);
        player.add(body);
        
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        var geometry = new THREE.BoxGeometry(8, 8, 8);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 4 + 12 + 12, 0);
        head.add(cube);

        var geometry = new THREE.BoxGeometry(8, 12, 4);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 6 + 12, 0);
        body.add(cube);

        var geometry = new THREE.BoxGeometry(4, 12, 4);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(2, 6, 0);
        rightLeg.add(cube);

        var geometry = new THREE.BoxGeometry(4, 12, 4);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(-2, 6, 0);
        leftLeg.add(cube);

        var geometry = new THREE.BoxGeometry(4, 12, 4);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(6, 6 + 12, 0);
        rightArm.add(cube);

        var geometry = new THREE.BoxGeometry(4, 12, 4);
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(-6, 6 + 12, 0);
        leftArm.add(cube);

        // this.add(player);

        player.position.set(0, -6 - 12, 0);

        this.position.set(0, 0, 0);

    }
}
