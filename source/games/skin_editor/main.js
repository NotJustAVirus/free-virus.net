import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Player } from './Player.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const skincanvas = document.getElementById('skin');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.getElementById('game').appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;


var img = new Image();
img.src = 'skins/justavirus.png';
img.onload = function() {
	skincanvas.width = img.width;
	skincanvas.height = img.height;
	var ctx = skincanvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const player = new Player(skincanvas);
	scene.add(player);
};


camera.position.z = 40;

const clock = new THREE.Clock();

function animate() {
	var delta = clock.getDelta();

	controls.update(delta);

	renderer.render( scene, camera );

}