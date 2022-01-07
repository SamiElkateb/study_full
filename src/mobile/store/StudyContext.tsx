/** @format */

import React, { useState, useEffect } from 'react';
import StudyCard from '../DataStructures/StudyCard';
import cards from '../data/cards.json';
import StudyCardClass from '../DataStructures/StudyCard';
const allStudyCards = cards.map((card) => new StudyCardClass(card));

interface StudyContextInterface {
	studyDeck: StudyCard[];
	progress:number;
	cardCorrectHandler: (studyCard:StudyCard) => void;
	cardFalseHandler: (studyCard:StudyCard) => void;
  }

const StudyContext = React.createContext<StudyContextInterface>({
	studyDeck: [],
	progress:0,
	cardCorrectHandler: (studyCard:StudyCard) => {},
	cardFalseHandler: (studyCard:StudyCard) => {},
});

const StudyContextProvider:React.FC = (props) => {
	const {children}= props
	const [studyDeck, setStudyDeck] = useState<StudyCard[]>([]);
	const [cardsToStudyLength, setCardsToStudyLength] = useState(0);

	const progress = ((cardsToStudyLength-studyDeck.length)/Math.max(cardsToStudyLength, 1))*100
	useEffect(() => {
		setStudyDeck(allStudyCards);
		setCardsToStudyLength(allStudyCards.length)
	}, []);

	const cardCorrectHandler = (studyCard:StudyCard) => {
		setStudyDeck((prevDeck) => prevDeck.filter((card) => card.id !== studyCard.id));
	};
	const cardFalseHandler = (studyCard:StudyCard) => {
		setStudyDeck((prevDeck) => prevDeck.filter((card) => card.id !== studyCard.id));
	};
	const studyContext = { studyDeck, progress, cardCorrectHandler, cardFalseHandler };

	return (
		<StudyContext.Provider value={studyContext}>
			{children}
		</StudyContext.Provider>
	);
};

export default StudyContext;
export { StudyContext, StudyContextProvider };
