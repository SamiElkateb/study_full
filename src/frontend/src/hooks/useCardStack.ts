import { useEffect, useState } from 'react';
import { getCardsByLessonId } from '../API/cards';
import StudyCard from '../DataStructures/StudyCard';

const useCardStack = (lessonId?: number) => {
	const [cards, setCards] = useState<StudyCard[]>([]);

	const showCards = cards.length > 0;

	useEffect(() => {
		if (!lessonId) return;
		updateCardsHandler(lessonId);
	}, [lessonId]);

	const updateCardsHandler = (lessonId: number) => {
		getCardsByLessonId(lessonId).then((response) => {
			const cardsMap = response.data.map((courseResponse) => {
				return new StudyCard(courseResponse);
			});
			setCards(cardsMap);
		});
	};

	return { cards, showCards, updateCardsHandler };
};

export default useCardStack;
