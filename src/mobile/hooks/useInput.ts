import React, { useState } from 'react';

type validation = (toValidate: string) => boolean;
interface useInputFuncReturn<T> {
	inputChangeHandler: (event: T) => void;
	inputBlurHandler: () => void;
	inputIsInvalid: boolean;
	inputValue: T;
	inputIsValid: boolean;
}

function useInput<T extends string>(
	validation: validation,
	initialValue: T
): useInputFuncReturn<T> {
	const [inputValue, setInputValue] = useState(initialValue);
	const [inputTouched, setInputTouched] = useState(false);

	const inputIsValid = validation(inputValue);
	const inputIsInvalid = !inputIsValid && inputTouched;

	const inputChangeHandler = (event: T) => {
		setInputValue(event);
	};

	const inputBlurHandler = () => {
		setInputTouched(true);
	};

	return {
		inputChangeHandler,
		inputBlurHandler,
		inputIsInvalid,
		inputValue,
		inputIsValid,
	};
}

export default useInput;
