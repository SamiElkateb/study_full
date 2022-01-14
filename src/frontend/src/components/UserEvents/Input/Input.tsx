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
	onFocus?: (event: React.FormEvent<HTMLInputElement>) => void;
	autoComplete?: string;
	placeholder?: string;
	readOnly?: boolean;
	defaultValue?: string;
	Icon?: IconType;
	invalid?: boolean;
};

const Input: React.FC<InputProps> = (props) => {
	const {
		className,
		type,
		name,
		value,
		onChange,
		onBlur = () => {},
		onFocus = () => {},
		autoComplete = 'off',
		placeholder = '',
		readOnly = false,
		Icon,
		invalid = false,
	} = props;
	const id = type + name;

	let iconElement: JSX.Element | '' = '';
	if (typeof Icon != 'undefined') {
		iconElement = (
			<div className={classes.icon}>
				<Icon />
			</div>
		);
	}
	const labelClasses = [classes.input];
	className && labelClasses.push(className);
	invalid && labelClasses.push(classes.invalid);

	return (
		<label className={labelClasses.join(' ')} htmlFor={id}>
			{iconElement}
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				readOnly={readOnly}
				value={value}
			/>
		</label>
	);
};

export default Input;
