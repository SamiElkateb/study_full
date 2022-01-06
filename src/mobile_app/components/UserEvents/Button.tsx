/** @format */
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

interface props {
	onClick?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	styling?: 'primary' | 'secondary';
	color?: 'default' | 'error' | 'correct';
	style?: {};
}

const Button: React.FC<props> = (props) => {
	const {
		children,
		onClick,
		disabled = false,
		styling = 'primary',
		color = 'primary',
		style = {},
	} = props;
	const { theme } = useCustomTheme();

	const isSecondaryBtn = styling === 'secondary';
	const textColor = isSecondaryBtn ? theme[color] : theme.background;
	const backgroundColor = isSecondaryBtn ? 'transparent' : theme[color];

	const buttonStyle = {
		color: textColor,
		backgroundColor,
		borderColor: theme[color],
		borderWidth: 2,
	}

	return (
		<TouchableOpacity
			onPress={onClick}
			activeOpacity={0.7}
			disabled={disabled}
		>
			<Text style={[styles.button, buttonStyle, style ]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 28,
		textAlign: 'center',
		overflow: 'hidden',
	},
	disabled: {
		backgroundColor: 'grey',
		color: 'white',
	},
});
