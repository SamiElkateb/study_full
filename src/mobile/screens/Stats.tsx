/** @format */

import { View, StyleSheet } from 'react-native';

interface props {}
const Stats: React.FC<props> = (props) => {
	return <View style={styles.container}></View>;
};

export default Stats;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
	},
});
