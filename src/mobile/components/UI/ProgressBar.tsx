/** @format */

import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

interface props {
	progress?: number;
	color?: 'default' | 'error' | 'correct';
}

const ProgressBar: React.FC<props> = (props) => {
	const { theme } = useCustomTheme();
	const { progress = 0, color = 'correct' } = props;

	const animatedRef = useRef(new Animated.Value(progress)).current;

	const width = animatedRef.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});
	Animated.spring(animatedRef, {
		toValue: progress,
		useNativeDriver: false,
	}).start();

	const progressCustomStyle = {
		width,
		backgroundColor: theme[color],
	};

	return (
		<View style={styles.container}>
			<Animated.View
				style={{ ...styles.progressBar, ...progressCustomStyle }}
			></Animated.View>
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
	container: {
		zIndex: 1000,
		height: 10,
		width: '100%',
		backgroundColor: '#ccc',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.15,
		shadowRadius: 3,
	},
	progressBar: {
		height: '100%',
	},
});
