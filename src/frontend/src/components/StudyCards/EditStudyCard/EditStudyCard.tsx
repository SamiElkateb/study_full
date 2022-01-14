import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addCard, updateCard } from '../../../API/cards';
import { answerTypes } from '../../../constants/AnswerTypes';
import StudyCard from '../../../DataStructures/StudyCard';
import useAuth from '../../../hooks/useAuth';
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
	const { authToken } = useAuth();

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

	useEffect(() => {
		if (!studyCard) return;
		questionInputChangeHandler(studyCard.question);
		answerInputChangeHandler(studyCard.answer);
		answerTypeInputChangeHandler(studyCard.answerType);
	}, [studyCard]);

	const clearInputsHandler = () => {
		questionInputChangeHandler('');
		answerInputChangeHandler('');
	};

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

		if (isUpdate) {
			console.log(data);
			updateCard(data, authToken)
				.then(onEdited?.bind(null, lessonId))
				.then(clearInputsHandler);
		}
		if (!isUpdate) {
			addCard(data, authToken)
				.then(onEdited?.bind(null, lessonId))
				.then(clearInputsHandler);
		}
	};
	const isAnswerTypeText = enteredAnswerType === 'text';

	const submitText = isUpdate ? 'Update Card' : 'Add Card';
	const formTitle = isUpdate ? 'Update Card' : 'Add New Card';
	return (
		<Form onSubmit={submitHandler} title={formTitle}>
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
