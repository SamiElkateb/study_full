/** @format */

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

export type iconNames =
	| 'close'
	| 'question'
	| 'check'
	| 'flag'
	| 'calendar'
	| 'trophy'
	| 'curved-flag'
	| 'html'
	| 'sql'
	| 'git'
	| 'github'
	| 'javascript'
	| 'typescript'
	| 'docker'
	| 'kubernetes'
	| 'css'
	| 'sass'
	| 'arrowdown'
	| 'done'
	| 'square'
	| 'react'
	| 'backend'
	| 'rocket';
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
