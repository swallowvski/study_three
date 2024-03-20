import * as d3 from "d3";
import * as THREE from "three";

import { plateGeo } from "./basePlate";

const processingRange = (
	xs: number[],
	ys: number[],
	z: number,
	fn: (x: number, y: number, z: number) => number,
) => {
	const rs = [];
	for (const y of ys) {
		for (const x of xs) {
			const result = fn(x, y, z);
			rs.push(result);
		}
	}
	return rs;
};

type Normalzer = d3.ScaleLinear<number, number, never>;

const normalzeRange = (rs: number[], normalzer: Normalzer) => {
	return rs.map((r) => normalzer(r));
};

const colorFn = d3.interpolateSpectral;
const createColorPlate = (
	width: number,
	depth: number,
	widthSegments: number,
	depthSegments: number,
	colors: number[],
) => {
	const geo = plateGeo(width, depth, widthSegments, depthSegments);
	geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	return geo;
};
const checkMaxMin = (
	range: number[],
	fn: (x: number, y: number, z: number) => number,
) => {
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;
	for (const x of range) {
		for (const y of range) {
			for (const z of range) {
				const r = fn(x, y, z);
				if (max < r) {
					max = r;
				}
				if (min > r) {
					min = r;
				}
			}
		}
	}
	return [min, max];
};

const createPlate = (
	xs: number[],
	ys: number[],
	zs: number,
	min: number,
	max: number,
	fn: (x: number, y: number, z: number) => number,
) => {
	const result = processingRange(xs, ys, zs, fn);

	const rs = normalzeRange(
		result,
		d3.scaleLinear().domain([min, max]).range([0, 1]),
	);
	console.log(min, max);

	const colors = [];
	for (const r of rs) {
		const color = new THREE.Color(colorFn(r));
		colors.push(color.r, color.g, color.b);
	}
	const geo = createColorPlate(10, 10, xs.length - 1, ys.length - 1, colors);

	return geo;
};
export { createPlate, checkMaxMin };
