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

        var cube = new PlayerPart(8, 8, 8, material);
        cube.addUVmapping(64, 64, 0, 48);
        cube.position.set(0, 4 + 12 + 12, 0);
        head.add(cube);

        var cube = new PlayerPart(8, 12, 4, material);
        cube.addUVmapping(64, 64, 16, 32);
        cube.position.set(0, 6 + 12, 0);
        body.add(cube);

        var cube = new PlayerPart(4, 12, 4, material);
        cube.addUVmapping(64, 64, 0, 0);
        cube.position.set(2, 6, 0);
        rightLeg.add(cube);
        
        var cube = new PlayerPart(4, 12, 4, material);
        cube.addUVmapping(64, 64, 16, 0);
        cube.position.set(-2, 6, 0);
        leftLeg.add(cube);
        
        var cube = new PlayerPart(4, 12, 4, material);
        cube.addUVmapping(64, 64, 16+24, 32);
        cube.position.set(6, 6 + 12, 0);
        // cube.scale.set(2, 2, 2);
        rightArm.add(cube);
        
        var cube = new PlayerPart(4, 12, 4, material);
        cube.addUVmapping(64, 64, 32, 0);
        cube.position.set(-6, 6 + 12, 0);
        leftArm.add(cube);

        this.add(player);

        player.position.set(0, -6 - 12, 0);

        this.position.set(0, 0, 0);

    }
}

class PlayerPart extends THREE.Object3D {
    constructor(h, w, d, material) {
        super();
        this.h = h;
        this.w = w;
        this.d = d;
        this.pxPlane = new THREE.PlaneGeometry(d, w);
        this.nxPlane = new THREE.PlaneGeometry(d, w);
        this.pyPlane = new THREE.PlaneGeometry(h, d);
        this.nyPlane = new THREE.PlaneGeometry(h, d);
        this.pzPlane = new THREE.PlaneGeometry(h, w);
        this.nzPlane = new THREE.PlaneGeometry(h, w);
        this.pxPlane.rotateY(Math.PI / 2);
        this.nxPlane.rotateY(-Math.PI / 2);
        this.pyPlane.rotateX(-Math.PI / 2);
        this.nyPlane.rotateX(Math.PI / 2);
        this.pzPlane.rotateX(0);
        this.nzPlane.rotateX(Math.PI);
        this.pxPlane.translate(h / 2, 0, 0);
        this.nxPlane.translate(-h / 2, 0, 0);
        this.pyPlane.translate(0, w / 2, 0);
        this.nyPlane.translate(0, -w / 2, 0);
        this.pzPlane.translate(0, 0, d / 2);
        this.nzPlane.translate(0, 0, -d / 2);
        var px = new THREE.Mesh(this.pxPlane, material);
        var nx = new THREE.Mesh(this.nxPlane, material);
        var py = new THREE.Mesh(this.pyPlane, material);
        var ny = new THREE.Mesh(this.nyPlane, material);
        var pz = new THREE.Mesh(this.pzPlane, material);
        var nz = new THREE.Mesh(this.nzPlane, material);
        this.add(px);
        this.add(nx);
        this.add(py);
        this.add(ny);
        this.add(pz);
        this.add(nz);
    }

    addUVmapping(sizeX, sizeY, offsetX, offsetY) {
        this.calculateUVs(this.nxPlane, sizeX, sizeY, offsetX, offsetY);
        offsetX += this.d;
        this.calculateUVs(this.pzPlane, sizeX, sizeY, offsetX, offsetY);

        this.calculateUVs(this.nyPlane, sizeX, sizeY, offsetX, offsetY + this.w);
        this.calculateUVs(this.pyPlane, sizeX, sizeY, offsetX + this.d, offsetY + this.w);

        offsetX += this.h;
        this.calculateUVs(this.pxPlane, sizeX, sizeY, offsetX, offsetY);
        offsetX += this.d;
        this.calculateUVs(this.nzPlane, sizeX, sizeY, offsetX, offsetY);
    }

    calculateUVs(geometry, sizeX, sizeY, offsetX, offsetY) {
        var uvs = geometry.attributes.uv.array;
        var d = geometry.parameters.width;
        var w = geometry.parameters.height;
        uvs[0] = offsetX / sizeX;
        uvs[1] = offsetY / sizeY;
        uvs[2] = (offsetX + d) / sizeX;
        uvs[3] = offsetY / sizeY;
        uvs[4] = offsetX / sizeX;
        uvs[5] = (offsetY + w) / sizeY;
        uvs[6] = (offsetX + d) / sizeX;
        uvs[7] = (offsetY + w) / sizeY;
    } 
}