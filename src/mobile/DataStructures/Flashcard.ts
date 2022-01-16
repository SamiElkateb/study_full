import moment from 'moment';
import { answerType } from '../types/types';

interface flashcard {
	question: string;
	answer: string;
	streak?: number;
	answer_type: string;
	id: number;
}
class Flashcard {
	readonly question: string;
	readonly answer: string;
	readonly answerType: answerType;
	readonly id: number;
	private streak: number;
	constructor(props: flashcard) {
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

	setNextStudyDate = () => {
		const today = new Date();
		let nextStudyDate = new Date(today);
		const daysForNext = 1 + 3 * this.streak;
		nextStudyDate.setDate(nextStudyDate.getDate() + daysForNext);
		return moment(nextStudyDate).format('YYYY-MM-DD');
	};

	answeredCorrectly = () => {
		this.streak++;
		this.setNextStudyDate();
	};

	answeredIncorrectly = () => {
		this.streak = 0;
		this.setNextStudyDate();
	};
}
export default Flashcard;
