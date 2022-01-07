/** @format */

interface clampProps {
	number: number;
	min: number;
	max: number;
}
const clamp = (props: clampProps) => {
	const { number, min, max } = props;
	return Math.min(Math.max(number, min), max);
};

export { clamp };
