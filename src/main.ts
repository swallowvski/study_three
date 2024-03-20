import * as THREE from "three";
import { DragControls, OrbitControls } from "three/examples/jsm/Addons.js";

import { checkMaxMin, createPlate } from "./createPlate";
import { createInterceptAndFunc } from "./interceptAndFunc";
import { limitMoveErea } from "./limit";
import { arrowToolTip } from "./pointer";
import { range } from "./utils";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
(document.getElementById("demo") || document.body).appendChild(
	renderer.domElement,
);

const Fn = (x: number, y: number, z: number) => {
	const a = x * x;
	const b = y * y;
	const c = z * z;
	return Math.sqrt(a + b + c);
};

const axis1 = [...range(-4, 4, 0.1)];
const axis2 = [...range(-4, 4, 0.1)];

const iandf = createInterceptAndFunc([0, 0, 0], Fn);
const [min, max] = checkMaxMin(axis1, Fn);

const material = new THREE.MeshBasicMaterial({
	vertexColors: true,
	side: THREE.DoubleSide,
	//wireframe: true,
	//wireframeLinewidth: 1,
});

const geo1 = createPlate(
	axis1,
	axis2,
	iandf[0].intercept,
	min,
	max,
	iandf[0].func,
);
const geo2 = createPlate(
	axis1,
	axis2,
	iandf[1].intercept,
	min,
	max,
	iandf[1].func,
);

const geo3 = createPlate(
	axis1,
	axis2,
	iandf[2].intercept,
	min,
	max,
	iandf[2].func,
);

const mesh1 = new THREE.Mesh(geo1, material);
const mesh2 = new THREE.Mesh(geo2, material);
mesh2.rotateX(Math.PI / 2);
const mesh3 = new THREE.Mesh(geo3, material);
mesh3.rotateZ(Math.PI / 2);

const cameraControl = new OrbitControls(camera, renderer.domElement);

const dragControls = new DragControls(
	[arrowToolTip],
	camera,
	renderer.domElement,
);
dragControls.addEventListener("dragstart", (_) => {
	cameraControl.enabled = false;
});

dragControls.addEventListener("dragend", (_) => {
	cameraControl.enabled = true;
});

dragControls.transformGroup = true;

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(arrowToolTip);

camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const animate = () => {
	requestAnimationFrame(animate);
	mesh1.position.y = arrowToolTip.position.y;
	const geo1 = createPlate(
		axis1,
		axis2,
		arrowToolTip.position.y,
		min,
		max,
		iandf[0].func,
	);
	mesh1.geometry = geo1;

	mesh2.position.z = arrowToolTip.position.z;
	const geo2 = createPlate(
		axis1,
		axis2,
		arrowToolTip.position.z,
		min,
		max,
		iandf[1].func,
	);
	mesh2.geometry = geo2;

	mesh3.position.x = arrowToolTip.position.x;
	const geo3 = createPlate(
		axis1,
		axis2,
		arrowToolTip.position.x,
		min,
		max,
		iandf[2].func,
	);
	mesh3.geometry = geo3;

	limitMoveErea(arrowToolTip, 5);
	cameraControl.update();

	renderer.render(scene, camera);
};
animate();
