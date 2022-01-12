import { useParams } from 'react-router-dom';
import { addCard, updateCard } from '../../../API/cards';
import { answerTypes } from '../../../constants/AnswerTypes';
import StudyCard from '../../../DataStructures/StudyCard';
import useInput from '../../../hooks/useInput';
import { answerType } from '../../../types/types';
import Javascript from '../../Code/Javascript/Javascript';
import Terminal from '../../Code/Terminal/Terminal';
import Yaml from '../../Code/Yaml/Yaml';
import Button from '../../UserEvents/Button/Button';
import Form from '../../UserEvents/Form/Form';
import Input from '../../UserEvents/Input/Input';
import Select from '../../UserEvents/Select/Select';
import classes from './EditStudyCard.module.scss';
interface props {
	lessonId?: number;
	onEdited?: (lessonId: number) => void;
	studyCard?: StudyCard;
}

const EditStudyCard: React.FC<props> = (props) => {
	const { lessonId, studyCard, onEdited } = props;
	const answerTypeArray = [...answerTypes];
	const {
		inputChangeHandler: questionInputChangeHandler,
		inputValue: enteredQuestion,
	} = useInput(() => true, '' as string);

	const {
		inputChangeHandler: answerInputChangeHandler,
		inputValue: enteredAnswer,
	} = useInput(() => true, '' as string);
	const {
		inputChangeHandler: answerTypeInputChangeHandler,
		inputValue: enteredAnswerType,
	} = useInput(() => true, 'text' as answerType);

	const isUpdate = Boolean(studyCard);
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (!lessonId) return;
		const id = studyCard?.id;
		const data = {
			id,
			question: enteredQuestion,
			answer: enteredAnswer,
			answerType: enteredAnswerType,
			lessonId: lessonId,
		};

		if (isUpdate) updateCard(data).then(onEdited?.bind(null, lessonId));
		if (!isUpdate) addCard(data).then(onEdited?.bind(null, lessonId));
	};
	const isAnswerTypeText = enteredAnswerType === 'text';

	const submitText = isUpdate ? 'Update Card' : 'Add Card';
	return (
		<Form onSubmit={submitHandler}>
			<Input
				type="text"
				name="question"
				value={enteredQuestion}
				placeholder="Question ..."
				onChange={questionInputChangeHandler}
			/>
			<Select
				name="answerType"
				items={answerTypeArray}
				value={enteredAnswerType}
				onChange={answerTypeInputChangeHandler}
			/>
			<Input
				type="text"
				name="answer"
				value={enteredAnswer}
				placeholder="Answer ..."
				onChange={answerInputChangeHandler}
			/>
			{isAnswerTypeText && <p className={classes.preview}>Preview</p>}
			{enteredAnswerType === 'javascript' && (
				<Javascript code={enteredAnswer} />
			)}
			{enteredAnswerType === 'terminal' && (
				<Terminal code={enteredAnswer} />
			)}
			{enteredAnswerType === 'yaml' && <Yaml code={enteredAnswer} />}
			<Button type="submit">{submitText}</Button>
		</Form>
	);
};

export default EditStudyCard;
