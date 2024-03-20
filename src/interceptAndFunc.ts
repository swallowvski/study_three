type InterceptAndFunc = {
	intercept: number;
	func: (x: number, y: number, z: number) => number;
};

const createInterceptAndFunc = (
	xyz: [number, number, number],
	func: (x: number, y: number, z: number) => number,
): [InterceptAndFunc, InterceptAndFunc, InterceptAndFunc] => {
	const [x, y, z] = xyz;
	const xyFn = (x: number, y: number, z: number) => {
		return func(x, y, z);
	};

	const xzFn = (x: number, z: number, y: number) => {
		return func(x, y, z);
	};

	const yzFn = (y: number, z: number, x: number) => {
		return func(x, y, z);
	};

	return [
		{
			intercept: x,
			func: yzFn,
		},
		{
			intercept: y,
			func: xzFn,
		},
		{
			intercept: z,
			func: xyFn,
		},
	];
};

export { createInterceptAndFunc };
