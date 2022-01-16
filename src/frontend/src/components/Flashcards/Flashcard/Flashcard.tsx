import FlashcardClass from '../../../DataStructures/Flashcard';
import Javascript from '../../Code/Javascript/Javascript';
import Terminal from '../../Code/Terminal/Terminal';
import Yaml from '../../Code/Yaml/Yaml';
import Card from '../../UI/Card/Card';
import classes from './Flashcard.module.scss';
interface props {
	card: FlashcardClass;
	className?: string;
}

const Flashcard: React.FC<props> = (props) => {
	const { card, className } = props;
	const { question, answer, answerType } = card;

	return (
		<Card className={`${classes.card} ${className}`}>
			<p className={classes.question}>{question}</p>
			{answerType === 'text' && <p>{answer}</p>}
			{answerType === 'javascript' && <Javascript code={answer} />}
			{answerType === 'terminal' && <Terminal code={answer} />}
			{answerType === 'yaml' && <Yaml code={answer} />}
		</Card>
	);
};

export default Flashcard;
