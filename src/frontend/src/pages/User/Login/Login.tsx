import { loginAPI } from '../../../API/auth';
import Button from '../../../components/UserEvents/Button/Button';
import Form from '../../../components/UserEvents/Form/Form';
import Input from '../../../components/UserEvents/Input/Input';
import classes from './Login.module.scss';
import { validateEmail } from '../../../helpers/data_testing/validateEmail';
import { validatePassword } from '../../../helpers/data_testing/validatePassword';
import useInput from '../../../hooks/useInput';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const Login: React.FC = (props) => {
	const authCtx = useContext(AuthContext);
	const {
		inputChangeHandler: emailInputChangeHandler,
		inputValue: enteredEmail,
		inputIsInvalid: emailIsInvalid,
		inputBlurHandler: emailInputBlurHandler,
	} = useInput(validateEmail, '' as string);

	const {
		inputChangeHandler: passwordInputChangeHandler,
		inputValue: enteredPassword,
		inputIsInvalid: passwordIsInvalid,
		inputBlurHandler: passwordInputBlurHandler,
	} = useInput(validatePassword, '' as string);

	const formIsInvalid = passwordIsInvalid || emailIsInvalid;
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (formIsInvalid) return;
		const data = {
			email: enteredEmail,
			password: enteredPassword,
		};
		authCtx.login(data);
	};
	return (
		<Form
			title="Welcome Back!"
			onSubmit={submitHandler}
			className={classes.form}
		>
			<Input
				type="email"
				name="email"
				value={enteredEmail}
				placeholder="Your e-mail ..."
				autoComplete="email"
				onChange={emailInputChangeHandler}
				onBlur={emailInputBlurHandler}
				invalid={emailIsInvalid}
			/>
			{emailIsInvalid && (
				<p className={classes.invalid}>Please enter a valid e-mail.</p>
			)}
			<Input
				type="password"
				name="password"
				value={enteredPassword}
				placeholder="Your password ..."
				autoComplete="new-password"
				onChange={passwordInputChangeHandler}
				onBlur={passwordInputBlurHandler}
				invalid={passwordIsInvalid}
			/>
			{passwordIsInvalid && (
				<p className={classes.invalid}>
					Passwords must be at least 8 characters long.
				</p>
			)}
			<Button disabled={formIsInvalid} type="submit">
				Login
			</Button>
		</Form>
	);
};

export default Login;
