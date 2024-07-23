import * as THREE from 'three';


export class Player extends THREE.Object3D {

    constructor(skincanvas) {
        super();
        this.toggleMap = new Map();

        this.canvasTexture = new THREE.CanvasTexture(skincanvas);
        this.canvasTexture.colorSpace = THREE.SRGBColorSpace;
        this.canvasTexture.magFilter = THREE.NearestFilter;
        this.canvasTexture.minFilter = THREE.NearestFilter;

        this.material = new THREE.MeshBasicMaterial({ map: this.canvasTexture, side: THREE.DoubleSide, alphaTest: 0.1 });

        var head = new THREE.Object3D();
        head.position.set(0, 4 + 12 + 12, 0);
        var body = new THREE.Object3D();
        body.position.set(0, 6 + 12, 0);
        var rightLeg = new THREE.Object3D();
        rightLeg.position.set(-2, 6, 0);
        var leftLeg = new THREE.Object3D();
        leftLeg.position.set(2, 6, 0);
        var rightArm = new THREE.Object3D();
        rightArm.position.set(-6, 6 + 12, 0);
        var leftArm = new THREE.Object3D();
        leftArm.position.set(6, 6 + 12, 0);
        
        var headPart = new PlayerPart(8, 8, 8, this.material);
        headPart.addUVmapping(64, 64, 0, 48);
        var hat = new PlayerPart(8, 8, 8, this.material);
        hat.addUVmapping(64, 64, 32, 48);
        hat.scale.set(1.1, 1.1, 1.1);
        head.add(headPart);
        head.add(hat);
        this.toggleMap.set('hat-part', hat);
        this.toggleMap.set('head-part', headPart);
        
        var bodyPart = new PlayerPart(8, 12, 4, this.material);
        bodyPart.addUVmapping(64, 64, 16, 32);
        var jacket = new PlayerPart(8, 12, 4, this.material);
        jacket.addUVmapping(64, 64, 16, 16);
        jacket.scale.set(1.1, 1.1, 1.1);
        body.add(bodyPart);
        body.add(jacket);
        this.toggleMap.set('jacket-part', jacket);
        this.toggleMap.set('body-part', bodyPart);
        
        var rightLegPart = new PlayerPart(4, 12, 4, this.material);
        rightLegPart.addUVmapping(64, 64, 0, 32);
        var rightPants = new PlayerPart(4, 12, 4, this.material);
        rightPants.addUVmapping(64, 64, 0, 16);
        rightPants.scale.set(1.1, 1.1, 1.1);
        rightLeg.add(rightLegPart);
        rightLeg.add(rightPants);
        this.toggleMap.set('right-leg-part', rightLegPart);
        this.toggleMap.set('right-pants-part', rightPants);
        
        var leftLegPart = new PlayerPart(4, 12, 4, this.material);
        leftLegPart.addUVmapping(64, 64, 16, 0);
        var leftPants = new PlayerPart(4, 12, 4, this.material);
        leftPants.addUVmapping(64, 64, 0, 0);
        leftPants.scale.set(1.1, 1.1, 1.1);
        leftLeg.add(leftLegPart);
        leftLeg.add(leftPants);
        this.toggleMap.set('left-leg-part', leftLegPart);
        this.toggleMap.set('left-pants-part', leftPants);
        
        var rightArmPart = new PlayerPart(4, 12, 4, this.material);
        rightArmPart.addUVmapping(64, 64, 16+24, 32);
        var rightSleeve = new PlayerPart(4, 12, 4, this.material);
        rightSleeve.addUVmapping(64, 64, 16+24, 16);
        rightSleeve.scale.set(1.1, 1.1, 1.1);
        rightArm.add(rightArmPart);
        rightArm.add(rightSleeve);
        this.toggleMap.set('right-arm-part', rightArmPart);
        this.toggleMap.set('right-sleeve-part', rightSleeve);
        
        var leftArmPart = new PlayerPart(4, 12, 4, this.material);
        leftArmPart.addUVmapping(64, 64, 32, 0);
        var leftSleeve = new PlayerPart(4, 12, 4, this.material);
        leftSleeve.addUVmapping(64, 64, 48, 0);
        leftSleeve.scale.set(1.1, 1.1, 1.1);
        leftArm.add(leftArmPart);
        leftArm.add(leftSleeve);
        this.toggleMap.set('left-arm-part', leftArmPart);
        this.toggleMap.set('left-sleeve-part', leftSleeve);
        
        var player = new THREE.Object3D();
        
        player.add(rightArm);
        player.add(leftArm);
        player.add(rightLeg);
        player.add(leftLeg);
        player.add(head);
        player.add(body);

        this.add(player);
        
        player.position.set(0, -6 - 12, 0);
        
        // this.position.set(0, 0, 0);
    }

    togglePart(part) {
        var toggle = this.toggleMap.get(part);
        toggle.visible = !toggle.visible;
    }

    updateTexture() {
        this.canvasTexture.needsUpdate = true;
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
        this.calculateUVs(this.nxPlane, sizeX, sizeY, offsetX, offsetY, true, false);
        offsetX += this.d;
        this.calculateUVs(this.pzPlane, sizeX, sizeY, offsetX, offsetY, true, false);

        this.calculateUVs(this.pyPlane, sizeX, sizeY, offsetX, offsetY + this.w, true, false);
        this.calculateUVs(this.nyPlane, sizeX, sizeY, offsetX + this.h, offsetY + this.w, false, false);

        offsetX += this.h;
        this.calculateUVs(this.pxPlane, sizeX, sizeY, offsetX, offsetY, true, false);
        offsetX += this.d;
        this.calculateUVs(this.nzPlane, sizeX, sizeY, offsetX, offsetY, false, true);
    }

    calculateUVs(geometry, sizeX, sizeY, offsetX, offsetY, flipV, flipH) {
        var uvs = geometry.attributes.uv.array;
        var w = geometry.parameters.width;
        var h = geometry.parameters.height;
        uvs[0] = offsetX / sizeX;
        uvs[1] = offsetY / sizeY;
        uvs[2] = (offsetX + w) / sizeX;
        uvs[3] = offsetY / sizeY;
        uvs[4] = offsetX / sizeX;
        uvs[5] = (offsetY + h) / sizeY;
        uvs[6] = (offsetX + w) / sizeX;
        uvs[7] = (offsetY + h) / sizeY;
        if (flipV) {
            var tmp = uvs[1];
            uvs[1] = uvs[5];
            uvs[5] = tmp;
            tmp = uvs[3];
            uvs[3] = uvs[7];
            uvs[7] = tmp;
        }
        if (flipH) {
            var tmp = uvs[0];
            uvs[0] = uvs[2];
            uvs[2] = tmp;
            tmp = uvs[4];
            uvs[4] = uvs[6];
            uvs[6] = tmp;
        }
    } 
}