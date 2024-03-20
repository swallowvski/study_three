import type * as THREE from "three";
type PositionObject = {
	position: THREE.Vector3;
};

const limitMoveErea = (object: PositionObject, limit: number) => {
	if (object.position.x >= limit) {
		object.position.x = limit;
	}
	if (object.position.y >= limit) {
		object.position.y = limit;
	}
	if (object.position.z >= limit) {
		object.position.z = limit;
	}
	if (object.position.x <= -limit) {
		object.position.x = -limit;
	}
	if (object.position.y <= -limit) {
		object.position.y = -limit;
	}
	if (object.position.z <= -limit) {
		object.position.z = -limit;
	}
};

export { limitMoveErea };
