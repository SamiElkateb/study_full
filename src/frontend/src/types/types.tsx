/** @format */

import { iconNames } from '../constants/IconNames';

export type javascriptCodeType =
	| 'function'
	| 'string'
	| 'statement'
	| 'declaration'
	| 'comment'
	| 'linebreak'
	| 'variable';

export type yamlCodeType =
	| 'string'
	| 'object'
	| 'variable'
	| 'tab'
	| 'linebreak';
export type indexAndLengthArray = { index: number; length: number }[];

export type answerType = 'text' | 'javascript' | 'terminal' | 'yaml';

export interface toggleButton {
	isActive: boolean;
	isButtonActive: boolean;
	isSwipeActive: boolean;
	toggleButtonHandler: (override?: boolean) => void;
	toggleSwipeHandler: (override?: boolean) => void;
}

export type iconNamesType = typeof iconNames[number];
export type sizes = 'large' | 'med' | 'small' | 'x-small';

export interface NavigationTreeNodeData {
	id: number;
	title?: string;
	ancestry?: string;
	rank?: number;
	icon_name?: string;
	lesson_id?: number;
	creator_id?: number;
	visibility?: number;
}
