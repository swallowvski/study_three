import * as THREE from "three";
const origin = new THREE.Vector3(0, 0, 0);
const length = 5;

const xDir = new THREE.Vector3(1, 0, 0);
xDir.normalize();
const xHex = 0xff0000;
const xArray = new THREE.ArrowHelper(xDir, origin, length, xHex);
xArray.name = "x-Arrow";

const yDir = new THREE.Vector3(0, 1, 0);
yDir.normalize();
const yHex = 0x00ff00;
const yArray = new THREE.ArrowHelper(yDir, origin, length, yHex);
yArray.name = "y-Arrow";

const zDir = new THREE.Vector3(0, 0, 1);
yDir.normalize();
const zHex = 0x0000ff;
const zArray = new THREE.ArrowHelper(zDir, origin, length, zHex);
zArray.name = "z-Arrow";
console.log(zArray.children);

const arrowToolTip = new THREE.Group();
arrowToolTip.add(xArray);
arrowToolTip.add(yArray);
arrowToolTip.add(zArray);
arrowToolTip.name = "Arrow Group";

export { arrowToolTip };
