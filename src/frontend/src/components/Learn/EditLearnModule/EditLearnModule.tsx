import Button from '../../UserEvents/Button/Button';
import Input from '../../UserEvents/Input/Input';
import Form from '../../UserEvents/Form/Form';
import useInput from '../../../hooks/useInput';
import IconSelect from '../../UserEvents/IconSelect/IconSelect';
import { iconNamesType } from '../../../types/types';
import {
	learnModule,
	learnModuleType,
	learnModuleWithIcon,
} from '../../../types/learnModules';
import learnModuleHasIcon from '../../../helpers/data_testing/learnModuleHasIcon';
import { addLearnModule, updateLearnModule } from '../../../API/learnModule';
import useAuth from '../../../hooks/useAuth';

interface props {
	learnModuleType: learnModuleType;
	parentId?: number;
	onAdded?: () => void;
	learnModule?: learnModule;
}

const EditLearnModule: React.FC<props> = (props) => {
	const {
		learnModuleType,
		parentId,
		onAdded = () => {},
		learnModule,
	} = props;
	const { authToken } = useAuth();

	let moduleWithIcon;
	const hasIcon = learnModuleHasIcon(learnModuleType);
	if (learnModuleHasIcon(learnModule)) {
		moduleWithIcon = learnModule as learnModuleWithIcon;
	}

	const initialIcon =
		moduleWithIcon?.iconName || ('javascript' as iconNamesType);
	const initialTitle = learnModule?.title || ('' as string);
	const initialColor = moduleWithIcon?.color || ('#000000' as string);
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

		const isChapter = learnModuleType === 'chapter';
		const isLesson = learnModuleType === 'lesson';
		const courseId = isChapter ? parentId : undefined;
		const chapterId = isLesson ? parentId : undefined;

		const learnModuleData = {
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

		const apiData = {
			learnModule: learnModuleData,
			type: learnModuleType,
			token: authToken,
		};
		const isUpdate = Boolean(learnModule);
		if (isUpdate) updateLearnModule(apiData).then(onAdded);
		if (!isUpdate) addLearnModule(apiData).then(onAdded);
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

export default EditLearnModule;
