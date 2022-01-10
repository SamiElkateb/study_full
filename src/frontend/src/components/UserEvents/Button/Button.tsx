import classes from './Button.module.scss';

type props = {
	onClick?: (event: React.FormEvent) => void;
	disabled?: boolean;
	styling?: 'primary' | 'secondary' | 'card';
	type?: 'submit' | 'button';
	className?: string;
	selected?: boolean;
};

const Button: React.FC<props> = (props) => {
	const {
		children,
		onClick,
		className = '',
		disabled = false,
		styling = 'primary',
		selected = false,
	} = props;

	const style = classes['button-' + styling];
	const selectedStyle = selected ? classes.selected : '';
	const classNames = `${classes.button} ${style} ${className} ${selectedStyle}`;
	return (
		<button className={classNames} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
