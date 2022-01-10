import classes from './Button.module.scss';

type props = {
	onClick?: (event: React.FormEvent) => void;
	disabled?: boolean;
	styling?: 'primary' | 'secondary' | 'card';
	type?: 'submit' | 'button';
	className?: string;
};

const Button: React.FC<props> = (props) => {
	const {
		children,
		onClick,
		className = '',
		disabled = false,
		styling = 'primary',
	} = props;

	const selectedStyling = classes['button-' + styling];
	const classNames = `${classes.button} ${selectedStyling} ${className}`;
	return (
		<button className={classNames} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
