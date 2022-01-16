/** @format */

import { useState, useRef, useContext } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import Flashcard from '../DataStructures/Flashcard';
import StudyContext from '../Context/StudyContext';
import { toggleButton } from '../types/types';

type PointerEvent = 'auto' | 'none';
interface props {
	flashCard: Flashcard;
	falseButtonHook: toggleButton;
	correctButtonHook: toggleButton;
}

const useSwipe = (props: props) => {
	const { flashCard, falseButtonHook, correctButtonHook } = props;
	const pan: any = useRef(new Animated.ValueXY()).current;
	const [pointerEvent, setPointerEvent] = useState<PointerEvent>('auto');

	const studyCtx = useContext(StudyContext);
	const onCorrect = studyCtx.cardCorrectHandler;

	const { toggleSwipeHandler: correctBtnToggleHandler } = correctButtonHook;
	const { toggleSwipeHandler: falseBtnToggleHandler } = falseButtonHook;

	const width = Dimensions.get('window').width;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value,
				});
			},
			onPanResponderMove: (e, gestureState) => {
				if (pan.x._value > 30) {
					correctBtnToggleHandler(true);
					falseBtnToggleHandler(false);
				} else if (pan.x._value < -30) {
					falseBtnToggleHandler(true);
					correctBtnToggleHandler(false);
				}
				Animated.event([null, { dx: pan.x, dy: pan.y }], {
					useNativeDriver: false,
				})(e, gestureState);
			},
			onPanResponderRelease: () => {
				if (pan.x._value < -40 || pan.x._value > 40) {
					const direction = pan.x._value > 0 ? 1 : -1;
					Animated.timing(pan, {
						toValue: {
							x: direction * width * 1.5,
							y: pan.y._value * 4,
						},
						useNativeDriver: false,
						duration: 300,
					}).start(() => {
						onCorrect(flashCard);
					});
					setPointerEvent('none');
					return;
				}

				falseBtnToggleHandler(false);
				correctBtnToggleHandler(false);
				Animated.spring(pan, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
				}).start();
			},
		})
	).current;

	const rotateZ = pan.x.interpolate({
		inputRange: [-width / 2, width / 2],
		outputRange: ['-15deg', '15deg'],
	});
	const translateX = pan.x;
	const translateY = pan.y;

	const transform = [{ translateX }, { translateY }, { rotateZ }];

	return { transform, pointerEvent, panResponder };
};

export default useSwipe;
