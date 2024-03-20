export function* range(start: number, end: number, step = 1) {
	if ((start < end && step <= 0) || (start > end && step >= 0))
		throw new Error();

	const symbol = step > 0 ? 1 : -1;
	for (let i = start * symbol; i < end * symbol; i += step * symbol) {
		yield i && i * symbol;
	}
}
