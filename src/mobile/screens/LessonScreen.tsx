import {
	NavigationProp,
	RouteProp,
	useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import useCustomTheme from '../hooks/useCustomTheme';
import { lessonData } from '../types/api_interfaces';
import { RootStackParamList } from '../types/types';
import { Lesson } from '../DataStructures/LearnModule';
import { getLessonByChapterId } from '../API/lessons';
import LessonBtn from '../components/Learn/LessonBtn';
import Icon from '../components/UI/Icon';
import { getFlashcardsByLessonId } from '../API/flashcards';
import Loading from '../components/UI/Loading';
import useAuth from '../hooks/useAuth';
import { LessonManager } from '../database/LearnModuleManager';
import FlashcardManager from '../database/FlashcardManager';
import useEffectOnFocus from '../hooks/useEffectOnFocus';
import { FlatList } from 'react-native-gesture-handler';

interface props {
	route: RouteProp<RootStackParamList, 'Lessons'>;
	navigation: NavigationProp<RootStackParamList, 'Lessons'>;
}

const LessonScreen: React.FC<props> = (props) => {
	const { authToken } = useAuth();
	const navigation = useNavigation();
	const chapterId = props.route.params.chapterId;
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const { theme } = useCustomTheme();
	const [isLoading, setIsLoading] = useState(true);

	useEffectOnFocus(() => {
		const lessonManager = new LessonManager();
		lessonManager
			.getByChapterIdWithCompletion(chapterId)
			.then((response) => {
				setIsLoading(false);
				const lessonMap = response.map(
					(lessonResponse) => new Lesson(lessonResponse)
				);
				setLessons(lessonMap);
			});
	});

	const onStartStudyHandler = async (lessonId: number) => {
		const flashcardManager = new FlashcardManager();
		const initialDeck = await flashcardManager.getByLessonId(lessonId);
		setIsLoading(false);
		navigation.navigate('Study', { initialDeck, doesRepeat: true });
	};

	return (
		<View style={styles.container}>
			{isLoading && <Loading />}
			{lessons.length > 0 && (
				<FlatList
					data={lessons}
					keyExtractor={(lesson) => lesson.id.toString()}
					renderItem={({ item: lesson }) => (
						<LessonBtn
							lesson={lesson}
							onClick={onStartStudyHandler.bind(null, lesson.id)}
							isDone={lesson.isCompleted}
						/>
					)}
					ItemSeparatorComponent={({}) => (
						<View style={styles.separator}>
							<Icon
								name="arrowdown"
								size="med"
								color={theme.text}
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
};

export default LessonScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	separator: {
		alignItems: 'center',
	},
});
