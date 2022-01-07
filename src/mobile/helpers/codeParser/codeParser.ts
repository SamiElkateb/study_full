/** @format */

import terminalParser from './terminalParser';
import javascriptParser from './javascriptParser';
import yamlParser from './yamlParser';

type languages = 'terminal' | 'javascript' | 'yaml';

const codeParser = (code: string, language: languages) => {
	switch (language) {
		case 'terminal':
			return terminalParser(code);
		case 'javascript':
			return javascriptParser(code);
		case 'yaml':
			return yamlParser(code);
		default:
			return terminalParser(code);
	}
};

export default codeParser;
