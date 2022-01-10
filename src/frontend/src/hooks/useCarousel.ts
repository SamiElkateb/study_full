import React, { useEffect, useReducer, Reducer } from 'react';
interface carouselState {
	translation: number;
	canScrollLeft: boolean;
	canScrollRight: boolean;
}
interface action {
	type: 'SCROLL_LEFT' | 'SCROLL_RIGHT' | 'CAN_SCROLL_RIGHT';
	value?: boolean;
	ref: React.RefObject<HTMLDivElement>;
}
const initialCarouselState = {
	translation: 0,
	canScrollLeft: false,
	canScrollRight: false,
};

const carouselReducer: Reducer<carouselState, action> = (prevState, action) => {
	if (action.type === 'SCROLL_LEFT') {
		if (!action.ref.current) return prevState;

		const distanceRight = getDistanceRight(action.ref);
		const translationDistance = -Math.min(prevState.translation, 200);

		const translation = prevState.translation + translationDistance;
		action.ref.current.style.right = translation + 'px';
		const canScrollLeft = translation > 0;
		const canScrollRight = getCanScrollRight(
			distanceRight,
			translationDistance
		);
		return { ...prevState, translation, canScrollLeft, canScrollRight };
	}
	if (action.type === 'SCROLL_RIGHT') {
		if (!action.ref.current) return prevState;
		const distanceRight = getDistanceRight(action.ref);
		const translationDistance = getTranslationRight(action.ref);

		const translation = prevState.translation + translationDistance;

		action.ref.current.style.right = translation + 'px';

		const canScrollLeft = translation > 0;
		const canScrollRight = getCanScrollRight(
			distanceRight,
			translationDistance
		);

		return { ...prevState, translation, canScrollLeft, canScrollRight };
	}
	if (action.type === 'CAN_SCROLL_RIGHT') {
		const distanceRight = getDistanceRight(action.ref);
		const canScrollRight = getCanScrollRight(distanceRight);
		return { ...prevState, canScrollRight };
	}

	return prevState;
};

const useCarousel = (
	carouselRef: React.RefObject<HTMLDivElement>,
	carouselLength: number
) => {
	const [carouselState, dispatch] = useReducer(
		carouselReducer,
		initialCarouselState
	);
	const { canScrollLeft, canScrollRight } = carouselState;

	useEffect(() => {
		dispatch({ type: 'CAN_SCROLL_RIGHT', ref: carouselRef });
	}, [carouselLength]);

	const scrollLeftHandler = () => {
		dispatch({ type: 'SCROLL_LEFT', ref: carouselRef });
	};

	const scrollRightHandler = () => {
		dispatch({ type: 'SCROLL_RIGHT', ref: carouselRef });
	};

	return {
		scrollLeftHandler,
		scrollRightHandler,
		canScrollRight,
		canScrollLeft,
	};
};

export default useCarousel;

const getDistanceRight = (carouselRef: React.RefObject<HTMLDivElement>) => {
	if (!carouselRef.current) return undefined;
	const rect = carouselRef.current.getBoundingClientRect();
	return window.innerWidth - rect.x - rect.width;
};

const getTranslationRight = (carouselRef: React.RefObject<HTMLDivElement>) => {
	const distanceRight = getDistanceRight(carouselRef);

	if (typeof distanceRight !== 'number') return 200;
	if (distanceRight > 50) return 0;

	const distanceRightAbs = Math.abs(distanceRight - 50);
	return Math.min(distanceRightAbs, 200);
};

type canScrollRightFunc = (
	distanceRight: number | undefined,
	translation?: number
) => boolean;

const getCanScrollRight: canScrollRightFunc = (
	distanceRight,
	translation = 0
) => {
	if (typeof distanceRight !== 'number') return false;
	return distanceRight + translation < 50;
};
