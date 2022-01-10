/** @format */
import { IconType } from 'react-icons';
import classes from './Input.module.scss';

type InputProps = {
	className?: string;
	type: string;
	name: string;
	value: string;
	onChange: (event: React.FormEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
	autoComplete?: string;
	placeholder?: string;
	readOnly?: boolean;
	defaultValue?: string;
	Icon?: IconType;
};

const Input: React.FC<InputProps> = (props) => {
	const {
		className = '',
		type,
		name,
		value,
		onChange,
		onBlur = () => {},
		autoComplete = 'off',
		placeholder = '',
		readOnly = false,
		Icon,
	} = props;
	const id = Math.random() + type + name;

	let iconElement: JSX.Element | '' = '';
	if (typeof Icon != 'undefined') {
		iconElement = (
			<div className={classes.icon}>
				<Icon />
			</div>
		);
	}

	return (
		<label className={`${classes.input} ${className}`} htmlFor={id}>
			{iconElement}
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				readOnly={readOnly}
				value={value}
			/>
		</label>
	);
};

export default Input;
