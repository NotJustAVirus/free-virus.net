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


const player = new Player(skincanvas);
scene.add(player);
skincanvas.width = 64;
skincanvas.height = 64;

const layers = [];

$('#add-layer').click(() => {
	let input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/png';
	input.click();
	input.onchange = function() {
		let file = this.files[0];
		let reader = new FileReader();
		reader.onload = function() {
			let img = new Image();
			img.src = reader.result;
			img.onload = function() {
				var dummy = addLayer();
				let canvas = dummy.find('canvas')[0];
				let ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				onLayerUdated();
			};
		};
		reader.readAsDataURL(file);
	};
});

addLayer();

var img = new Image();
img.src = 'skins/justavirus.png';
img.onload = function() {
	var ctx = layers[0].getContext('2d');
	ctx.drawImage(img, 0, 0);
	onLayerUdated();
};

function addLayer() {
	var dummy = $('#dummy').find('.layer').clone();
	dummy.find('.layer-name').text('Layer ' + ($('#layer-list-content').children().length + 1));
	dummy.find('.delete-layer').click(function() {
		dummy.remove();
		layers.splice(layers.indexOf(dummy.find('canvas')[0]), 1);
		onLayerUdated();
	});
	layers.push(dummy.find('canvas')[0]);
	$('#layer-list-content').append(dummy);
	return dummy;
}

function onLayerUdated() {
	skincanvas.getContext('2d').clearRect(0, 0, skincanvas.width, skincanvas.height);
	layers.forEach(canvas => {
		skincanvas.getContext('2d').drawImage(canvas, 0, 0);
	});
	player.updateTexture();
}


camera.position.z = 40;

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