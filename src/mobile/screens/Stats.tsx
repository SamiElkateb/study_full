import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import StatsCard from '../components/Stats/StatsCard';
import StatsCircle from '../components/Stats/StatsCircle';
import StudyManager from '../database/StudyManager';
import useCustomTheme from '../hooks/useCustomTheme';
import useEffectOnFocus from '../hooks/useEffectOnFocus';

interface props {}
const Stats: React.FC<props> = (props) => {
	const { themeStyle } = useCustomTheme();
	const [mastery, setMastery] = useState(0);
	const [tomorrow, setTomorrow] = useState(0);
	const [mastered, setMastered] = useState(0);
	const [inRotation, setInRotation] = useState(0);

	const updateStatsHandler = async () => {
		const studyManager = new StudyManager();
		const total = (await studyManager.get()).length;
		const tomorrow = (await studyManager.getTomorrow()).length;
		const mastered = (await studyManager.getMastered()).length;
		const mastery = Math.floor((mastered / Math.max(total, 1)) * 100);
		setInRotation(total);
		setTomorrow(tomorrow);
		setMastered(mastered);
		setMastery(mastery);
	};

	useEffectOnFocus(updateStatsHandler);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<StatsCircle mastery={mastery} />
			<View>
				<Text style={[styles.data_title, themeStyle.onBackground]}>
					Flashcard Stats
				</Text>
				<View style={styles.data_container}>
					<StatsCard number={tomorrow} legend="Tomorrow" />
					<StatsCard number={3} legend="Day Streak" />
					<StatsCard number={mastered} legend="Mastered" />
					<StatsCard number={inRotation} legend="Total in rotation" />
				</View>
			</View>
		</ScrollView>
	);
};

export default Stats;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
	},
	data_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	data_title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 12,
	},
});
