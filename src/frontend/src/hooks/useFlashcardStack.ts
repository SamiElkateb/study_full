import { useEffect, useState } from 'react';
import { getFlashcardsByLessonId } from '../API/flashcards';
import Flashcard from '../DataStructures/Flashcard';
import useAuth from './useAuth';

const useCardStack = (lessonId?: number) => {
	const [cards, setCards] = useState<Flashcard[]>([]);
	const { authToken } = useAuth();
	const showCards = cards.length > 0;

	useEffect(() => {
		if (!lessonId) return;
		updateCardsHandler(lessonId);
	}, [lessonId]);

	const updateCardsHandler = (lessonId: number) => {
		if (!authToken) return;
		getFlashcardsByLessonId(lessonId, authToken).then((response) => {
			const cardsMap = response.data.map((courseResponse) => {
				return new Flashcard(courseResponse);
			});
			setCards(cardsMap);
		});
	};

	return { cards, showCards, updateCardsHandler };
};

export default useCardStack;
