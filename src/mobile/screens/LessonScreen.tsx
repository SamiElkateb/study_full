import {
	NavigationProp,
	RouteProp,
	useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

interface props {
	route: RouteProp<RootStackParamList, 'Lessons'>;
	navigation: NavigationProp<RootStackParamList, 'Lessons'>;
}

const LessonScreen: React.FC<props> = (props) => {
	const { authToken } = useAuth();
	const navigation = useNavigation();
	const chapterId = props.route.params.chapterId;
	const [lessons, setLessons] = useState<lessonData[]>([]);
	const { theme } = useCustomTheme();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const lessonManager = new LessonManager();
		lessonManager.getByChapterId(chapterId).then((response) => {
			setIsLoading(false);
			setLessons(response);
		});
	}, []);

	const onStartStudyHandler = async (lessonId: number) => {
		const flashcardManager = new FlashcardManager();
		const initialDeck = await flashcardManager.getByLessonId(lessonId);
		setIsLoading(false);
		navigation.navigate('Study', { initialDeck });
	};

	return (
		<View style={styles.container}>
			{isLoading && <Loading />}

			{lessons.map((lessonResponse, index, array) => {
				const isLastLesson = index === array.length - 1;
				const lesson = new Lesson(lessonResponse);
				return (
					<React.Fragment key={lesson.id}>
						<LessonBtn
							lesson={lesson}
							onClick={onStartStudyHandler.bind(null, lesson.id)}
						/>
						{!isLastLesson && (
							<Icon
								name="arrowdown"
								size="med"
								color={theme.text}
							/>
						)}
					</React.Fragment>
				);
			})}
		</View>
	);
};

export default LessonScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
