import { StyleSheet, Text } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import Card from '../UI/Card';

interface props {
	number: number;
	legend: string;
}
const StatsCard: React.FC<props> = (props) => {
	const { number, legend } = props;
	const { themeStyle } = useCustomTheme();
	return (
		<Card style={styles.card}>
			<Text style={[styles.number, themeStyle.onSurface]}>{number}</Text>
			<Text style={[styles.legend, themeStyle.onSurface]}>{legend}</Text>
		</Card>
	);
};

export default StatsCard;

const styles = StyleSheet.create({
	card: {
		margin: 12,
		padding: 12,
		flexBasis: '33%',
		borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},
	number: {
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 12,
	},
	legend: {
		textTransform: 'capitalize',
	},
});
