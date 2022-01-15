import { View, Text, StyleSheet, TextInputAndroidProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
}
const Input: React.FC<props> = (props) => {
	const { theme } = useCustomTheme();
	const {
		label,
		placeholder = '',
		onChange,
		onBlur,
		value,
		secureTextEntry = false,
		autoCompleteType = 'off',
		invalid = false,
	} = props;
	const errorStyle = invalid ? { borderColor: theme.error } : null;
	return (
		<View style={[styles.input_container]}>
			<Text style={[styles.label]}>{label}</Text>
			<TextInput
				style={[styles.input, errorStyle]}
				placeholder={placeholder}
				onChangeText={onChange}
				onBlur={onBlur}
				value={value}
				secureTextEntry={secureTextEntry}
				autoCompleteType={autoCompleteType}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	input_container: {
		marginTop: 32,
		marginBottom: 16,
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
		borderWidth: 2,
	},
});
