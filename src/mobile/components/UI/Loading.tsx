import { ActivityIndicator, StyleSheet } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

const Loading: React.FC = (props) => {
	const { theme } = useCustomTheme();
	return (
		<ActivityIndicator
			size="large"
			color={theme.primary}
			style={styles.loading}
		/>
	);
};

export default Loading;

const styles = StyleSheet.create({
	loading: {
		alignSelf: 'center',
		position: 'absolute',
		top: '50%',
		zIndex: 10,
	},
});
