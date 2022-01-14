import { useState } from 'react';
import Input from '../../../components/UserEvents/Input/Input';
import classes from './PasswordInput.module.scss';
interface props {
	value: string;
	onChange: (event: React.FormEvent<HTMLInputElement>) => void;
	onBlur: (event: React.FormEvent<HTMLInputElement>) => void;
}
const PasswordInput: React.FC<props> = (props) => {
	const { value, onChange, onBlur } = props;
	const [isFocused, setIsFocused] = useState(false);
	const hasLowerCase = value.match(/[a-z]/g);
	const hasUpperCase = value.match(/[A-Z]/g);
	const hasNumber = value.match(/[0-9]/g);
	const hasLength = value.length > 8;

	const lowerCaseClass = hasLowerCase ? classes.valid : classes.invalid;
	const upperCaseClass = hasUpperCase ? classes.valid : classes.invalid;
	const numberClass = hasNumber ? classes.valid : classes.invalid;
	const lengthClass = hasLength ? classes.valid : classes.invalid;

	const focusHandler = () => {
		setIsFocused(true);
	};
	const blurHandler = (event: React.FormEvent<HTMLInputElement>) => {
		setIsFocused(false);
		onBlur(event);
	};
	return (
		<>
			<Input
				type="password"
				name="password"
				value={value}
				placeholder="Your password ..."
				autoComplete="new-password"
				onChange={onChange}
				onFocus={focusHandler}
				onBlur={blurHandler}
				invalid={false}
			/>
			{isFocused && (
				<>
					<p className={lowerCaseClass}>lowercase letter</p>
					<p className={upperCaseClass}>capital (uppercase) letter</p>
					<p className={numberClass}>number</p>
					<p className={lengthClass}>Minimum 8 characters</p>
				</>
			)}
		</>
	);
};

export default PasswordInput;
