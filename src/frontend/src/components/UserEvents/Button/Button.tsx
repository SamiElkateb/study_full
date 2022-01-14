import classes from './Button.module.scss';

type props = {
	onClick?: (event: React.FormEvent) => void;
	disabled?: boolean;
	styling?: 'primary' | 'secondary' | 'card';
	type?: 'submit' | 'button';
	className?: string;
	selected?: boolean;
	size?: 'med' | 'big';
};

const Button: React.FC<props> = (props) => {
	const {
		children,
		onClick,
		className,
		disabled = false,
		styling = 'primary',
		selected = false,
		size = 'med',
		type = 'button',
	} = props;

	const classNames = [
		classes.button,
		classes[size],
		classes['button-' + styling],
	];

	className && classNames.push(className);
	selected && classNames.push(classes.selected);

	return (
		<button
			className={classNames.join(' ')}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
