import { indexAndLengthArray } from "../../types/types";
import {parseType, getRegexIndexesAndLength} from './parseHelpers'

/** @format */
interface codeVariable {
	type: 'variable';
	text: string;
}

const terminalParser = (code:string) => {
	const codeVariableRegex = /\[([a-zA-Z]|_)+]/gim; // matches text inside brackets

	const variablesLocations = getRegexIndexesAndLength(code, codeVariableRegex);

    return getParsedCommand(code, variablesLocations);
};

const getParsedCommand = (code:string, variablesLocations:indexAndLengthArray) =>{
    let parsedCommandArray: (string|codeVariable)[] = [];
	let cursor = 0;

	variablesLocations.forEach((varLoc) => {
		const varStart = varLoc.index;
		const varEnd = varLoc.index + varLoc.length;
		const type:'variable' = 'variable'

		const beforeVariable = code.slice(cursor, varStart);
		parsedCommandArray.push(beforeVariable);

		const variable = parseType({code, varStart, varEnd, type})
		parsedCommandArray.push(variable);

		cursor = varEnd;
	});

    if(cursor<code.length){
        const afterVariables = code.slice(cursor, code.length);
		parsedCommandArray.push(afterVariables);
    }

    return parsedCommandArray;
}

export default terminalParser