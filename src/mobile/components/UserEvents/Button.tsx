import { GestureResponderEvent, StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import useCustomTheme from '../../hooks/useCustomTheme';
import { CustomTheme, CustomThemeColors } from '../../types/theme';

interface props {
	onClick?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	styling?: 'primary' | 'secondary';
	color?: 'error' | 'correct';
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

	const textColorKey = ('on' +
		capitalizeFirstLetter(color)) as CustomThemeColors;
	const isSecondaryBtn = styling === 'secondary';
	const textColor = isSecondaryBtn ? theme[color] : theme[textColorKey];
	const backgroundColor = isSecondaryBtn ? 'transparent' : theme[color];
	const disabledStyle = disabled ? styles.disabled : null;
	const shadow =
		!isSecondaryBtn && !disabled ? styles.button_container : null;
	const buttonStyle = {
		color: textColor,
		backgroundColor,
		borderColor: theme[color],
		borderWidth: 2,
	};

	return (
		<TouchableOpacity
			onPress={onClick}
			activeOpacity={0.7}
			disabled={disabled}
			style={shadow}
		>
			<Text style={[styles.button, buttonStyle, style, disabledStyle]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button_container: {
		borderRadius: 28,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	button: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 4,
		textAlign: 'center',
		overflow: 'hidden',
	},
	disabled: {
		backgroundColor: 'grey',
		color: 'white',
		borderColor: 'transparent',
	},
});
