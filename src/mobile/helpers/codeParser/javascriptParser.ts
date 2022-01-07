/** @format */

import { javascriptCodeType } from '../../types';
import {parseType, getRegexIndexesAndLength, addLocationsAndType} from './parseHelpers'

/** @format */

interface typedCode {
	type: javascriptCodeType;
	text: string;
}

type typedLocationsArray = ({
	index: number;
	length: number;
	type: javascriptCodeType;
}|null)[];


const javascriptParser = (code: string) => {
	//const functionsRegex = /([a-z]|_)+?(?<!if|while|switch|for)(?=(?:\())/gim; // matches text before ( except if, while, ...
	const functionsRegex = /([a-z]|_)+?(?=(?:\())/gim; // matches text before ( except if, while, ...
	const stringRegex = /('[^']*')|("[^"]*")/gim; // matches everything between "" or ''

	const statementsRegex =
		/((switch|for|while|if|else if) ?(?=(?:\()))|return +|else *(?=(?:\{))/gim;
	const declarationsRegex = /const +|let +|var +|=>/gim;
	const lineBreaksRegex = /;|{|}/gim;
	const variablesRegex =
		/([a-z]|_)+(?=(?:\.))|([a-z]|_)+ *(?=(!|=|;|,|:|\)|<|>|-|\+))/gim;
	const commentRegex = /\/\*.*\*\//gim;

	const functionsLocation = getRegexIndexesAndLength(code, functionsRegex);
	const stringLocation = getRegexIndexesAndLength(code, stringRegex);
	const statementsLocation = getRegexIndexesAndLength(code, statementsRegex);
	const declarationsLocation = getRegexIndexesAndLength(code, declarationsRegex);
	const lineBreaksLocation = getRegexIndexesAndLength(code, lineBreaksRegex);
	const variablesLocation = getRegexIndexesAndLength(code, variablesRegex);
	const commentsLocation = getRegexIndexesAndLength(code, commentRegex);

	let locationsArray: typedLocationsArray = [];

	locationsArray = addLocationsAndType(
		locationsArray,
		functionsLocation,
		'function'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		stringLocation,
		'string'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		statementsLocation,
		'statement'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		declarationsLocation,
		'declaration'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		lineBreaksLocation,
		'linebreak'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		variablesLocation,
		'variable'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		commentsLocation,
		'comment'
	);

	return getParsedCommand(code, locationsArray);
};

const getParsedCommand = (
	code: string,
	variablesLocations: typedLocationsArray
) => {
	let parsedCommandArray: (string | typedCode)[] = [];
	let cursor = 0;
	variablesLocations = variablesLocations.filter((a) => a);

	variablesLocations.forEach((varLoc) => {
		const varStart = varLoc!.index;
		const varEnd = varLoc!.index + varLoc!.length;
		const type = varLoc!.type;

		if (cursor !== varStart) {
			const beforeVariable = code.slice(cursor, varStart);
			parsedCommandArray.push(beforeVariable);
		}
		if (type === 'linebreak') {
			const text = code.slice(varStart, varEnd);
			const linebreak: typedCode = { text: '', type: 'linebreak' };
			if (text === '}') {
				parsedCommandArray.push(linebreak);
				parsedCommandArray.push(text);
			} else {
				parsedCommandArray.push(text);
				parsedCommandArray.push(linebreak);
			}
		} else {
			const variable = parseType({ code, varStart, varEnd, type });
			parsedCommandArray.push(variable);
		}

		cursor = varEnd;
	});

	if (cursor < code.length) {
		const afterVariables = code.slice(cursor, code.length);
		parsedCommandArray.push(afterVariables);
	}

	return parsedCommandArray;
};

export default javascriptParser;
