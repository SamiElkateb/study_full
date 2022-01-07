

/** @format */

import { yamlCodeType } from '../../types/types';
import {
	parseType,
	getRegexIndexesAndLength,
	addLocationsAndType,
} from './parseHelpers';

/** @format */

interface typedCode {
	type: yamlCodeType;
	text: string;
}
type typedLocationsArray = ({
	index: number;
	length: number;
	type: yamlCodeType;
}|null)[];


const yamlParser = (code: string) => {
	//{2,}
	const objectRegex = /([a-z]|_)+?(?=(?:\:( |%)))/gim;
	const variableRegex = /\[([a-z]|_){2,}?\](?=(?:\:))/gim;
	const stringRegex = /(\:|\-) [^\%]*/gim;
	const linebreakRegex = /%n/gim;
	const tabRegex = /%t/gim;

	const linebreakLocations = getRegexIndexesAndLength(code, linebreakRegex);
	const tabsLocations = getRegexIndexesAndLength(code, tabRegex);
	const objectLocations = getRegexIndexesAndLength(code, objectRegex);
	const variableLocations = getRegexIndexesAndLength(code, variableRegex);
	const stringLocations = getRegexIndexesAndLength(code, stringRegex);

	let locationsArray: typedLocationsArray = [];

	locationsArray = addLocationsAndType(
		locationsArray,
		objectLocations,
		'object'
	);

	locationsArray = addLocationsAndType(
		locationsArray,
		variableLocations,
		'variable'
	);

	locationsArray = addLocationsAndType(
		locationsArray,
		stringLocations,
		'string'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		linebreakLocations,
		'linebreak'
	);
	locationsArray = addLocationsAndType(
		locationsArray,
		tabsLocations,
		'tab'
	);

	locationsArray = locationsArray.filter((a) => a);

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
		let varStart = varLoc!.index;
		const varEnd = varLoc!.index + varLoc!.length;
		const type = varLoc!.type;

		if (cursor !== varStart) {
			const beforeVariable = code.slice(cursor, varStart);
			beforeVariable!== '%' && parsedCommandArray.push(beforeVariable);
		}
		if (type === 'linebreak') {
			const linebreak: typedCode = { text: '', type: 'linebreak' };
			parsedCommandArray.push(linebreak);
		}else if (type === 'tab') {
			const tab: typedCode = { text: '', type: 'tab' };
			parsedCommandArray.push(tab);
		}else if(type === 'string'){
			const beforeString = code.slice(varStart, varStart+1);
			parsedCommandArray.push(beforeString);
			varStart++
			const string = parseType({ code, varStart, varEnd, type });
			parsedCommandArray.push(string);
		}else if(type === 'variable'){
			const variable = parseType({ code, varStart, varEnd, type });
			parsedCommandArray.push(variable);
		}else{
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

export default yamlParser;
