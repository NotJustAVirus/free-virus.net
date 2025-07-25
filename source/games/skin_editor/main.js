import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Player } from './Player.js';
import { MouseListener } from './MouseListener.js';
import { ToolController } from './ToolController.js';
import { ColorSelector } from './ColorSelector.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const skincanvas = document.getElementById('skin');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.getElementById('game').appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
// controls.enabled = false;
camera.position.z = 40;

const player = new Player(skincanvas);
scene.add(player);

const mouseListener = new MouseListener(renderer.domElement, camera, scene, controls);

const toolController = new ToolController(mouseListener);

toolController.layerList.setCallOnUpdate(() => {
	player.updateTexture();
});

var img = new Image();
img.src = 'skins/justavirus.png';
img.onload = function() {
	toolController.layerList.addLayer().setImage(img);
};

const clock = new THREE.Clock();

function animate() {
	var delta = clock.getDelta();

	controls.update(delta);

	renderer.render( scene, camera );

}

window.addEventListener('resize', onWindowResize, false);
onWindowResize();

function onWindowResize() {
	camera.aspect = (window.innerWidth - 10) / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize((window.innerWidth - 10), window.innerHeight);
}

$('.part-select').toggleClass('active', true);
$('.part-select').click(function(event) {
	event.stopPropagation();
	$(this).toggleClass('active');
	var part = $(this).data('part');
	player.togglePart(part);
});