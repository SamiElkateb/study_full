/** @format */

import classes from './Button.module.scss';

type props = {
	onClick?: (event: React.FormEvent) => void;
	disabled?: boolean;
	styling?: string;
	type?: 'submit' | 'button';
};

const Button: React.FC<props> = (props) => {
	const { children, onClick } = props;

	return (
		<button className={classes.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
