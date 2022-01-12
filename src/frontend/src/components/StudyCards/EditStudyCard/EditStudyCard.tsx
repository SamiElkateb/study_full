import { answerTypes } from '../../../constants/AnswerTypes';
import useInput from '../../../hooks/useInput';
import { answerType } from '../../../types/types';
import Javascript from '../../Code/Javascript/Javascript';
import Terminal from '../../Code/Terminal/Terminal';
import Button from '../../UserEvents/Button/Button';
import Form from '../../UserEvents/Form/Form';
import Input from '../../UserEvents/Input/Input';
import Select from '../../UserEvents/Select/Select';

const EditStudyCard: React.FC = () => {
	const answerTypeArray = [...answerTypes];
	const {
		inputChangeHandler: questionInputChangeHandler,
		inputValue: enteredQuestion,
	} = useInput(() => true, '' as string);

	const {
		inputChangeHandler: answerInputChangeHandler,
		inputValue: enteredAnswer,
	} = useInput(() => true, '' as answerType);
	const {
		inputChangeHandler: answerTypeInputChangeHandler,
		inputValue: enteredAnswerType,
	} = useInput(() => true, '' as string);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
	};

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
			{enteredAnswerType === 'javascript' && (
				<Javascript code={enteredAnswer} />
			)}
			{enteredAnswerType === 'terminal' && (
				<Terminal code={enteredAnswer} />
			)}
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default EditStudyCard;
