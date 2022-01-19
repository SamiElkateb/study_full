import React, { useState, useEffect } from 'react';
import Flashcard from '../DataStructures/Flashcard';
import { flashcardData } from '../types/api_interfaces';

interface StudyContextInterface {
	studyDeck: Flashcard[];
	progress: number;
	cardCorrectHandler: (flashcard: Flashcard) => void;
	cardFalseHandler: (flashcard: Flashcard) => void;
}

const StudyContext = React.createContext<StudyContextInterface>({
	studyDeck: [],
	progress: 0,
	cardCorrectHandler: (flashcard: Flashcard) => {},
	cardFalseHandler: (flashcard: Flashcard) => {},
});
interface props {
	initialDeck: flashcardData[];
	doesRepeat?: boolean;
}

const StudyContextProvider: React.FC<props> = (props) => {
	const { children, initialDeck, doesRepeat } = props;
	const flashcards = initialDeck.map((flashcard) => new Flashcard(flashcard));
	const [studyDeck, setStudyDeck] = useState<Flashcard[]>(flashcards);
	const [totalDeckLength, setTotalDeckLength] = useState(initialDeck.length);

	const progress =
		((totalDeckLength - studyDeck.length) / Math.max(totalDeckLength, 1)) *
		100;

	const cardCorrectHandler = (flashcard: Flashcard) => {
		flashcard.answeredCorrectly();
		setStudyDeck((prevDeck) =>
			prevDeck.filter((card) => card.id !== flashcard.id)
		);
	};
	const cardFalseHandler = (flashcard: Flashcard) => {
		flashcard.answeredIncorrectly();
		setStudyDeck((prevDeck) => {
			const newDeck = prevDeck.filter((card) => card.id !== flashcard.id);
			if (!doesRepeat) return newDeck;
			return [...newDeck, flashcard];
		});
		if (doesRepeat) {
			setTotalDeckLength((prevState) => prevState++);
		}
	};
	const studyContext = {
		studyDeck,
		progress,
		cardCorrectHandler,
		cardFalseHandler,
	};

	return (
		<StudyContext.Provider value={studyContext}>
			{children}
		</StudyContext.Provider>
	);
};

export default StudyContext;
export { StudyContext, StudyContextProvider };
