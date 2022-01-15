import React, { useState, useEffect } from 'react';
import StudyCard from '../DataStructures/StudyCard';
import StudyCardClass from '../DataStructures/StudyCard';
import { cardData } from '../types/api_interfaces';

interface StudyContextInterface {
	studyDeck: StudyCard[];
	progress: number;
	cardCorrectHandler: (studyCard: StudyCard) => void;
	cardFalseHandler: (studyCard: StudyCard) => void;
}

const StudyContext = React.createContext<StudyContextInterface>({
	studyDeck: [],
	progress: 0,
	cardCorrectHandler: (studyCard: StudyCard) => {},
	cardFalseHandler: (studyCard: StudyCard) => {},
});
interface props {
	initialDeck: cardData[];
}

const StudyContextProvider: React.FC<props> = (props) => {
	const { children, initialDeck } = props;
	const studyCards = initialDeck.map((card) => new StudyCardClass(card));
	const [studyDeck, setStudyDeck] = useState<StudyCard[]>(studyCards);
	const [cardsToStudyLength] = useState(initialDeck.length);

	const progress =
		((cardsToStudyLength - studyDeck.length) /
			Math.max(cardsToStudyLength, 1)) *
		100;

	const cardCorrectHandler = (studyCard: StudyCard) => {
		setStudyDeck((prevDeck) =>
			prevDeck.filter((card) => card.id !== studyCard.id)
		);
	};
	const cardFalseHandler = (studyCard: StudyCard) => {
		setStudyDeck((prevDeck) =>
			prevDeck.filter((card) => card.id !== studyCard.id)
		);
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
