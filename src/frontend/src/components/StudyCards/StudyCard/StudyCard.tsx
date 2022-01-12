import { useParams } from 'react-router-dom';
import { addCard, updateCard } from '../../../API/cards';
import { answerTypes } from '../../../constants/AnswerTypes';
import StudyCardClass from '../../../DataStructures/StudyCard';
import useInput from '../../../hooks/useInput';
import { answerType } from '../../../types/types';
import Javascript from '../../Code/Javascript/Javascript';
import Terminal from '../../Code/Terminal/Terminal';
import Yaml from '../../Code/Yaml/Yaml';
import Card from '../../UI/Card/Card';
import Button from '../../UserEvents/Button/Button';
import Form from '../../UserEvents/Form/Form';
import Input from '../../UserEvents/Input/Input';
import Select from '../../UserEvents/Select/Select';
import classes from './StudyCard.module.scss';
interface props {
	card: StudyCardClass;
}

const StudyCard: React.FC<props> = (props) => {
	const { question, answer, answerType } = props.card;

	return (
		<Card className={classes.card}>
			<p className={classes.question}>{question}</p>
			{answerType === 'text' && <p>{answer}</p>}
			{answerType === 'javascript' && <Javascript code={answer} />}
			{answerType === 'terminal' && <Terminal code={answer} />}
			{answerType === 'yaml' && <Yaml code={answer} />}
		</Card>
	);
};

export default StudyCard;
