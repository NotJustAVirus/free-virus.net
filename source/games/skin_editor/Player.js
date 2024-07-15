import * as THREE from 'three';


export class Player extends THREE.Object3D {

    constructor() {
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

        this.add(player);

        player.position.set(0, -6 - 12, 0);

        this.position.set(0, 0, 0);

    }
}
