import { StyleSheet, Text, View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import useCustomTheme from '../../hooks/useCustomTheme';
import Card from '../UI/Card';

interface props {
	mastery: number;
}
const StatsCircle: React.FC<props> = (props) => {
	const { mastery } = props;
	const { theme, themeStyle } = useCustomTheme();
	return (
		<View style={styles.chart}>
			<ProgressCircle
				style={{ height: 200 }}
				progress={mastery / 100}
				progressColor={theme.primary}
				strokeWidth={16}
				backgroundColor="#ccc"
			/>
			<View style={[styles.legend_container]}>
				<Text style={[styles.number, themeStyle.onBackground]}>
					{mastery}%
				</Text>
				<Text style={[styles.text, themeStyle.onBackground]}>
					Mastery
				</Text>
			</View>
		</View>
	);
};

export default StatsCircle;

const styles = StyleSheet.create({
	chart: {
		justifyContent: 'center',
	},
	legend_container: {
		position: 'absolute',
		alignSelf: 'center',
	},
	number: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 40,
		marginBottom: 12,
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
