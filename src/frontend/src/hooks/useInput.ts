import React, { useState } from 'react';

type validation = (toValidate: string) => boolean;
interface useInputFuncReturn<T> {
	inputChangeHandler: (
		event: React.FormEvent<HTMLInputElement | HTMLSelectElement> | T
	) => void;
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

	const inputChangeHandler = (
		event: React.FormEvent<HTMLInputElement | HTMLSelectElement> | T
	) => {
		event = event as React.FormEvent<HTMLInputElement | HTMLSelectElement>;
		if (event.nativeEvent instanceof Event) {
			const value = event.currentTarget.value as T;
			setInputValue(value);
		}
		if (typeof event === 'string') {
			setInputValue(event);
		}
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
