import React, { useState, useEffect, Reducer, useReducer } from 'react';
import Flashcard from '../DataStructures/Flashcard';
import { flashcardData } from '../types/api_interfaces';
interface StudyState {
	studyDeck: Flashcard[];
	flashcardsToRepeat: Flashcard[];
	initialDeckLength: number;
	totalDeckLength: number;
}
interface action {
	type: 'CARD_CORRECT' | 'CARD_FALSE' | 'ADD_DECK';
	flashcard: Flashcard;
}

const studyReducer: Reducer<StudyState, action> = (prevState, action) => {
	if (action.type === 'CARD_CORRECT') {
		const flashcard = action.flashcard;
		flashcard.answeredCorrectly();
		const prevDeck = prevState.studyDeck;
		const studyDeck = prevDeck.filter((card) => card.id !== flashcard.id);
		return {
			...prevState,
			studyDeck,
		};
	}

	if (action.type === 'CARD_FALSE') {
		const flashcard = action.flashcard;
		flashcard.answeredIncorrectly();
		const prevDeck = prevState.studyDeck;
		const studyDeck = prevDeck.filter((card) => card.id !== flashcard.id);
		const flashcardsToRepeat = [...prevState.flashcardsToRepeat, flashcard];
		const totalDeckLength = prevState.totalDeckLength + 1;
		return {
			...prevState,
			studyDeck,
			flashcardsToRepeat,
			totalDeckLength,
		};
	}

	return prevState;
};
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
	const initialStudyState = {
		flashcardsToRepeat: [],
		studyDeck: flashcards,
		initialDeckLength: flashcards.length,
		totalDeckLength: flashcards.length,
	};
	const [studyState, dispatch] = useReducer(studyReducer, initialStudyState);
	const {
		studyDeck,
		flashcardsToRepeat,
		initialDeckLength,
		totalDeckLength,
	} = studyState;

	const remainingFlashcardsAmount =
		studyDeck.length + flashcardsToRepeat.length;

	const progress =
		((initialDeckLength - studyDeck.length) /
			Math.max(initialDeckLength, 1)) *
		100;

	const progressWithRepeat =
		((totalDeckLength - remainingFlashcardsAmount) /
			Math.max(totalDeckLength, 1)) *
		100;

	const cardCorrectHandler = (flashcard: Flashcard) => {
		dispatch({ type: 'CARD_CORRECT', flashcard });
	};
	const cardFalseHandler = (flashcard: Flashcard) => {
		dispatch({ type: 'CARD_FALSE', flashcard });
	};

	const studyContext = {
		studyDeck,
		flashcardsToRepeat,
		progress,
		progressWithRepeat,
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
