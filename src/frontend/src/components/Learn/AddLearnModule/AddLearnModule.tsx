import Button from '../../UserEvents/Button/Button';
import Input from '../../UserEvents/Input/Input';
import Form from '../../UserEvents/Form/Form';
import useInput from '../../../hooks/useInput';
import IconSelect from '../../UserEvents/IconSelect/IconSelect';
import { iconNamesType } from '../../../types/types';
import { addCourse, updateCourse } from '../../../API/courses';
import { addLesson, updateLesson } from '../../../API/lessons';
import { addChapter, updateChapter } from '../../../API/chapters';
import { learnModule, learnModuleWithIcon } from '../../../types/learnModules';
import { Course } from '../../../DataStructures/LearnModule';
import { learnModulesIconNames } from '../../../constants/IconNames';
import learnModuleHasIcon from '../../../helpers/data_testing/learnModuleHasIcon';

interface props {
	type: 'course' | 'chapter' | 'lesson';
	parentId?: number;
	onAdded?: () => void;
	learnModule?: learnModule;
}

const AddLearnModule: React.FC<props> = (props) => {
	const { type, parentId = 0, onAdded = () => {}, learnModule } = props;

	let moduleWithIcon;
	if (learnModuleHasIcon(learnModule)) {
		moduleWithIcon = learnModule as learnModuleWithIcon;
	}
	const isUpdate = Boolean(learnModule);
	const initialIcon =
		moduleWithIcon?.iconName || ('javascript' as iconNamesType);
	const initialTitle = learnModule?.title || ('' as string);
	const initialColor = moduleWithIcon?.color || ('#000000' as string);
	const isCourse = type === 'course';
	const isChapter = type === 'chapter';
	const isLesson = type === 'lesson';
	const hasIcon = isCourse || isChapter;
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
		const visibility = learnModule?.visibility || 1;
		const creatorId = learnModule?.creatorId || 1;
		const rank = learnModule?.rank || 1;
		const id = learnModule?.id;
		const courseId = isChapter ? parentId : undefined;
		const chapterId = isLesson ? parentId : undefined;

		const data = {
			id,
			title: enteredTitle,
			creatorId,
			visibility,
			rank,
			iconName: enteredIcon,
			color: enteredColor,
			courseId,
			chapterId,
		};

		if (isUpdate && isCourse) updateCourse(data).then(onAdded);
		if (isUpdate && isChapter) updateChapter(data).then(onAdded);
		if (isUpdate && isLesson) updateLesson(data).then(onAdded);

		if (!isUpdate && isCourse) addCourse(data).then(onAdded);
		if (!isUpdate && isChapter) addChapter(data).then(onAdded);
		if (!isUpdate && isLesson) addLesson(data).then(onAdded);
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

			{hasIcon && (
				<>
					<Input
						type="color"
						name="color"
						value={enteredColor}
						placeholder="Color"
						onChange={colorInputChangeHandler}
					/>
					<IconSelect
						name="icon_name"
						value={enteredIcon}
						iconColor={enteredColor}
						onChange={iconInputChangeHandler}
					/>
				</>
			)}
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default AddLearnModule;
