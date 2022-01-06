/** @format */

import { View, StyleSheet } from 'react-native';
import { getCards } from '../API/study';
import LessonChapterBtn from '../components/Lessons/LessonChapterBtn';
import LessonTitle from '../components/Lessons/LessonTitle';
import Icon from '../components/UI/Icon';

interface props {}
const Lessons: React.FC<props> = (props) => {
	return (
		<View style={styles.container}>
			<LessonTitle title='Javascript' icon='javascript' color='#f7d14a' />
			<LessonChapterBtn title="Creating Variables" onClick={() => {}} done={true} />
			<Icon name='arrowdown' color='#c4d9f6' size='large' />
			<LessonChapterBtn title="Arrays Basics" onClick={() => {}} />
			<Icon name='arrowdown' color='#c4d9f6' size='large' />
			<LessonChapterBtn title="Arrays Advanced" onClick={() => {}} />
		</View>
	);
};

export default Lessons;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems:'center'
	},
});
