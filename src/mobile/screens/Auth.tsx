import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/UserEvents/Button';
import Input from '../components/UserEvents/Input';
import { validateEmail } from '../helpers/data_testing/validateEmail';
import { validatePassword } from '../helpers/data_testing/validatePassword';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

interface props {
	title: string;
	type: 'login' | 'register';
}

const Auth: React.FC<props> = (props) => {
	const { title, type } = props;
	const authCtx = useAuth();
	const {
		inputChangeHandler: emailInputChangeHandler,
		inputValue: enteredEmail,
		inputIsInvalid: emailIsInvalid,
		inputIsValid: emailIsValid,
		inputBlurHandler: emailInputBlurHandler,
	} = useInput(validateEmail, '' as string);

	const {
		inputChangeHandler: passwordInputChangeHandler,
		inputValue: enteredPassword,
		inputIsValid: passwordIsValid,
		inputIsInvalid: passwordIsInvalid,
		inputBlurHandler: passwordInputBlurHandler,
	} = useInput(validatePassword, '' as string);

	const formIsValid = emailIsValid && passwordIsValid;
	const submitHandler = (event: GestureResponderEvent) => {
		event.preventDefault();
		if (!formIsValid) return;
		const data = {
			email: enteredEmail,
			password: enteredPassword,
		};
		type === 'login' && authCtx.login(data);
		type === 'register' && authCtx.register(data);
	};

	return (
		<SafeAreaView style={[styles.safe_container]}>
			<KeyboardAvoidingView
				style={[styles.container]}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<Text style={[styles.title]}>{title}</Text>
				<View>
					<Input
						label="Email"
						placeholder={'email@email.com'}
						onBlur={emailInputBlurHandler}
						onChange={emailInputChangeHandler}
						value={enteredEmail}
						autoCompleteType={'email'}
						invalid={emailIsInvalid}
						errorText="Please enter a valid e-mail."
					/>
					<Input
						label="Password"
						placeholder={'SuperSecretPassword'}
						onBlur={passwordInputBlurHandler}
						onChange={passwordInputChangeHandler}
						value={enteredPassword}
						secureTextEntry={true}
						autoCompleteType={'password'}
						invalid={passwordIsInvalid}
						errorText="Passwords must be at least 8 characters long."
					/>
				</View>
				<Button onClick={submitHandler} disabled={!formIsValid}>
					Continue
				</Button>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Auth;

const Login: React.FC = () => {
	return <Auth type="login" title="Welcome Back!" />;
};
const Register: React.FC = () => {
	return <Auth type="register" title="Create Your Free Account!" />;
};
export { Login, Register, Auth };

const styles = StyleSheet.create({
	safe_container: {
		flex: 1,
	},
	container: {
		padding: 32,
		flex: 1,
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 26,
		marginTop: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
