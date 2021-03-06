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
export type iconNamesType = typeof iconNames[number];

export interface toggleButton {
	isActive: boolean;
	isButtonActive: boolean;
	isSwipeActive: boolean;
	toggleButtonHandler: (override?: boolean) => void;
	toggleSwipeHandler: (override?: boolean) => void;
}

export type iconNames =
	| 'back'
	| 'close'
	| 'question'
	| 'check'
	| 'flag'
	| 'calendar'
	| 'trophy'
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

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { iconNames } from '../constants/IconNames';
import Flashcard from '../DataStructures/Flashcard';
import { flashcardData } from './api_interfaces';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Login: undefined;
	Register: undefined;
	Modal: undefined;
	Study: { initialDeck: flashcardData[]; doesRepeat?: boolean };
	Chapters: { courseId: number };
	Lessons: { chapterId: number };
	Daily: undefined;
	NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
	TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;
