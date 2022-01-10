import Button from '../../UserEvents/Button/Button';
import Input from '../../UserEvents/Input/Input';
import Form from '../../UserEvents/Form/Form';
import useInput from '../../../hooks/useInput';
import Select from '../../UserEvents/Select/Select';
import IconSelect from '../../UserEvents/IconSelect/IconSelect';
import { iconNamesType } from '../../../types/types';
import {
	anyLearnModulePost,
	learnModulePost,
} from '../../../types/api_interfaces';
import { addCourse } from '../../../API/courses';
import { addLesson } from '../../../API/lessons';
import { addChapter } from '../../../API/chapters';

interface props {
	type: 'course' | 'chapter' | 'lesson';
	courseId?: number;
	chapterId?: number;
	onAdded?: () => void;
}

const AddLearnModule: React.FC<props> = (props) => {
	const { type, courseId = 0, chapterId = 0, onAdded = () => {} } = props;
	const initialIcon = 'javascript' as iconNamesType;
	const initialTitle = '' as string;
	const initialColor = '#000000' as string;
	const isCourse = type === 'course';
	const isChapter = type === 'chapter';
	const isLesson = type === 'lesson';
	const showIcon = isCourse || isChapter;
	const validatorString = (toValidate: string) =>
		toValidate.trim().length > 0;

	const {
		inputChangeHandler: titleInputChangeHandler,
		inputValue: enteredTitle,
	} = useInput(validatorString, initialTitle);
	const {
		inputChangeHandler: colorInputChangeHandler,
		inputValue: enteredColor,
	} = useInput(validatorString, initialColor);
	const {
		inputChangeHandler: iconInputChangeHandler,
		inputValue: enteredIcon,
	} = useInput(validatorString, initialIcon);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const visibility = 1;
		const creatorId = 1;
		const rank = 1;

		const data = {
			title: enteredTitle,
			creatorId,
			visibility,
			rank,
			iconName: enteredIcon,
			color: enteredColor,
			courseId,
			chapterId,
		};

		if (isCourse) addCourse(data);
		if (isChapter) addChapter(data);
		if (isLesson) addLesson(data);
		onAdded();
	};
	return (
		<Form onSubmit={submitHandler}>
			<Input
				type="text"
				name="title"
				value={enteredTitle}
				placeholder="Title"
				onChange={titleInputChangeHandler}
			/>
			<Input
				type="color"
				name="color"
				value={enteredColor}
				placeholder="Color"
				onChange={colorInputChangeHandler}
			/>
			{showIcon && (
				<IconSelect
					name="icon_name"
					value={enteredIcon}
					iconColor={enteredColor}
					onChange={iconInputChangeHandler}
				/>
			)}
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default AddLearnModule;
