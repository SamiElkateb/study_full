import { answerType } from '../types/types';

interface card {
	question: string;
	answer: string;
	streak?: number;
	answerType: string;
	id: number;
}
class StudyCard {
	readonly question: string;
	readonly answer: string;
	readonly answerType: answerType;
	readonly id: number;
	private streak: number;
	constructor(props: card) {
		const { question, answer, answerType, streak = 0, id } = props;
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.streak = streak;
		if (
			answerType === 'terminal' ||
			answerType === 'yaml' ||
			answerType === 'javascript'
		) {
			this.answerType = answerType;
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
