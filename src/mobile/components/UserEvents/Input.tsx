import { View, Text, StyleSheet, TextInputAndroidProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ColorsBase } from '../../constants/Colors';
import useCustomTheme from '../../hooks/useCustomTheme';

interface props {
	label?: string;
	placeholder?: string;
	onChange?: (event: string) => void;
	onBlur?: () => void;
	value?: string;
	secureTextEntry?: boolean;
	autoCompleteType?: TextInputAndroidProps['autoCompleteType'];
	invalid?: boolean;
	errorText?: string;
}
const Input: React.FC<props> = (props) => {
	const { theme, themeStyle } = useCustomTheme();
	const {
		label,
		placeholder = '',
		onChange,
		onBlur,
		value,
		secureTextEntry = false,
		autoCompleteType = 'off',
		invalid = false,
		errorText,
	} = props;
	const errorStyle = invalid
		? { borderColor: theme.error, backgroundColor: theme.errorBackground }
		: null;
	return (
		<View style={[styles.input_container]}>
			<Text style={[styles.label, themeStyle.onBackground]}>{label}</Text>
			<TextInput
				style={[styles.input, errorStyle]}
				placeholder={placeholder}
				onChangeText={onChange}
				onBlur={onBlur}
				value={value}
				secureTextEntry={secureTextEntry}
				autoCompleteType={autoCompleteType}
			/>
			{invalid && errorText && (
				<Text style={[styles.error]}>{errorText}</Text>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	input_container: {
		marginVertical: 8,
	},
	label: {
		marginVertical: 8,
		fontSize: 14,
		fontWeight: 'bold',
	},
	input: {
		fontSize: 20,
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 4,
		borderColor: 'transparent',
		marginBottom: 12,
		borderWidth: 2,
	},
	error: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
		color: ColorsBase.error,
	},
});
