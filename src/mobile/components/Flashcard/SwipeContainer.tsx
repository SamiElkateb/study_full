/** @format */

import React, { useContext, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Flashcard from '../../DataStructures/Flashcard';
import useSwipe from '../../hooks/useSwipe';
import StudyContext from '../../Context/StudyContext';
import { toggleButton } from '../../types/types';

interface props {
	flashCard: Flashcard;
	falseButtonHook: toggleButton;
	correctButtonHook: toggleButton;
	showAnswerButtonHook: toggleButton;
	isAnswerCorrect?: boolean;
	index: number;
}

const SwipeContainer: React.FC<props> = (props) => {
	const {
		children,
		flashCard,
		falseButtonHook,
		correctButtonHook,
		showAnswerButtonHook,
		index,
		isAnswerCorrect,
	} = props;
	const { transform, pointerEvent, panResponder, flashcardHideAnimation } =
		useSwipe({
			flashCard,
			falseButtonHook,
			correctButtonHook,
		});

	useEffect(() => {
		if (typeof isAnswerCorrect !== 'undefined') {
			flashcardHideAnimation(isAnswerCorrect);
		}
	}, [isAnswerCorrect]);

	const studyCtx = useContext(StudyContext);
	const zIndex = { zIndex: studyCtx.studyDeck.length - index };
	const shouldDeactivateSwipe =
		falseButtonHook.isButtonActive ||
		correctButtonHook.isButtonActive ||
		showAnswerButtonHook.isButtonActive;

	const animatedStyle = [
		{
			transform,
		},
		styles.container,
		StyleSheet.absoluteFill,
	];
	const panGestures = shouldDeactivateSwipe ? null : panResponder.panHandlers;

	return (
		<View
			style={[StyleSheet.absoluteFill, zIndex]}
			pointerEvents={pointerEvent}
		>
			<Animated.View style={animatedStyle} {...panGestures}>
				{children}
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 36,
		paddingHorizontal: 20,
	},
});

export default SwipeContainer;
