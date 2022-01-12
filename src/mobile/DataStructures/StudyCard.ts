/** @format */

import { answerType } from '../types/types';

interface card {
	question: string;
	answer: string;
	streak?: number;
	answer_type: string;
	id: number;
}
class StudyCard {
	readonly question: string;
	readonly answer: string;
	readonly answerType: answerType;
	readonly id: number;
	private streak: number;
	constructor(props: card) {
		const { question, answer, answer_type, streak = 0, id } = props;
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.streak = streak;
		if (
			answer_type === 'terminal' ||
			answer_type === 'yaml' ||
			answer_type === 'javascript'
		) {
			this.answerType = answer_type;
		} else {
			this.answerType = 'text';
		}
	}

	setNextStudyDate = () => {};
	answeredCorrectly = () => {
		this.streak++;
	};

	answeredIncorrectly = () => {
		this.streak = 0;
	};
}
export default StudyCard;
