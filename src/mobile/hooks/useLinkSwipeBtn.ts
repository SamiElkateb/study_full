/** @format */

import { useState } from 'react';

const useLinkSwipeBtn = () => {
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [isSwipeActive, setIsSwipeActive] = useState(false);

	const isActive = isButtonActive || isSwipeActive;
	const toggleButtonHandler = (override?:boolean) => {
		if(isSwipeActive) return
		if(typeof override !== 'undefined'){
			setIsButtonActive(override);
			return;
		}
		setIsButtonActive((prevState)=>(
			!prevState
		));
	};
	const toggleSwipeHandler = (override?:boolean) => {
		if(isButtonActive) return
		if(typeof override !== 'undefined'){
			setIsSwipeActive(override);
			return;
		}
		setIsSwipeActive((prevState)=>(
			!prevState
		));
	};

	return {
		isActive,
		isButtonActive,
		isSwipeActive,
		toggleButtonHandler,
		toggleSwipeHandler,
	};
};

export default useLinkSwipeBtn;
