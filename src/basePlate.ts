import * as THREE from "three";

const plateGeo = (
	width: number,
	depth: number,
	widthSegments: number,
	depthSegments: number,
) => {
	const geo = new THREE.BufferGeometry();
	const width_half = width / 2;
	const depth_half = depth / 2;
	const gridX = Math.floor(widthSegments);
	const gridZ = Math.floor(depthSegments);
	const gridX1 = gridX + 1;
	const gridZ1 = gridZ + 1;
	const segment_width = width / gridX;
	const segment_depth = depth / gridZ;
	const indices = [];
	const vertices = [];
	const normals = [];
	const uvs = [];

	for (let iz = 0; iz < gridZ1; iz++) {
		const z = iz * segment_depth - depth_half;
		for (let ix = 0; ix < gridX1; ix++) {
			const x = ix * segment_width - width_half;
			vertices.push(x, 0, z);
			normals.push(0, 0, 1);
			uvs.push(ix / gridX);
			uvs.push(1 - iz / gridZ);
		}
	}

	geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
	geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

	for (let iz = 0; iz < gridZ; iz++) {
		for (let ix = 0; ix < gridX; ix++) {
			const a = ix + gridX1 * iz;
			const b = ix + gridX1 * (iz + 1);
			const c = ix + 1 + gridX1 * (iz + 1);
			const d = ix + 1 + gridX1 * iz;
			indices.push(a, b, d);
			indices.push(b, c, d);
		}
	}
	geo.setIndex(indices);
	return geo;
};

export { plateGeo };
