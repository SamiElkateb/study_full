import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	GestureResponderEvent,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/UserEvents/Button';
import Input from '../../components/UserEvents/Input';
import { validateEmail } from '../../helpers/data_testing/validateEmail';
import { validatePassword } from '../../helpers/data_testing/validatePassword';
import useAuth from '../../hooks/useAuth';
import useInput from '../../hooks/useInput';

const Login: React.FC = () => {
	const authCtx = useAuth();
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
	const submitHandler = (event: GestureResponderEvent) => {
		event.preventDefault();
		if (formIsInvalid) return;
		const data = {
			email: enteredEmail,
			password: enteredPassword,
		};
		authCtx.login(data);
	};
	return (
		<SafeAreaView style={[styles.safe_container]}>
			<KeyboardAvoidingView
				style={[styles.container]}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<Text style={[styles.title]}>Welcome Back!</Text>
				<View>
					<Input
						label="Email"
						placeholder={'email@email.com'}
						onBlur={emailInputBlurHandler}
						onChange={emailInputChangeHandler}
						value={enteredEmail}
						autoCompleteType={'email'}
						invalid={emailIsInvalid}
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
					/>
				</View>
				<Button onClick={submitHandler}>Continue</Button>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Login;

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
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
