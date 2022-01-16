import { answerType } from '../types/types';

interface flashcard {
	question: string;
	answer: string;
	streak?: number;
	answer_type: string;
	lesson_id: number;
	id: number;
}
class Flashcard {
	readonly question: string;
	readonly answer: string;
	readonly answerType: answerType;
	readonly lessonId: number;
	readonly id: number;
	private streak: number;
	constructor(props: flashcard) {
		const {
			question,
			answer,
			answer_type,
			lesson_id,
			streak = 0,
			id,
		} = props;
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.streak = streak;
		this.lessonId = lesson_id;
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
export default Flashcard;
