/** @format */
import { indexAndLengthArray } from '../../types';

interface typedCode<Type> {
	type: Type;
	text: string;
}

interface parseTypeParam<Type> {
	code: string;
	varStart: number;
	varEnd: number;
	type: Type;
}
type typedLocationsArray<Type> = ({
	index: number;
	length: number;
	type: Type;
}|null)[];

function parseType<T extends string>  (data: parseTypeParam<T>): typedCode<T> {
	const { code, varStart, varEnd, type } = data;
	let text = code.slice(varStart, varEnd);
    if(type === 'variable'){
        text = text.replace('[', '').replace(']', '')
    }
	return { text, type };
};

function addLocationsAndType<T> (
	array: typedLocationsArray<T>,
	locations: indexAndLengthArray,
	type: T
)  {
	locations.forEach((varLoc) => {
		const varStart = varLoc.index;
		array[varStart] = {
			index: varLoc.index,
			length: varLoc.length,
			type,
		};
	});
	return array;
};

const getRegexIndexesAndLength = (string: string, regex: RegExp) => {
	let regexIndexes = [];
	let i = 0;
	let cursor = 0;
	while (cursor < string.length) {
		const currentString = string.slice(cursor);
		const regexIndex = currentString.search(regex);
		if (regexIndex >= 0 && string.match(regex)![i]) {
			cursor += regexIndex;
			const length = string.match(regex)![i].length;
			regexIndexes.push({ index: cursor, length });
			cursor += length-1;
			i++;
		} else {
			cursor = string.length;
		}
		cursor++;
	}
	return regexIndexes;
};


export { parseType, getRegexIndexesAndLength, addLocationsAndType };
