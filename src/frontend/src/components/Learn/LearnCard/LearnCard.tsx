import { Course, Chapter } from '../../../DataStructures/LearnModule';
import classes from './LearnCard.module.scss';
import Icon from '../../UI/Icons/Icon';
import Button from '../../UserEvents/Button/Button';
import EditToolbox from '../../UserEvents/EditToolbox/EditToolbox';
import { learnModule } from '../../../types/learnModules';
interface props {
	learningModule: learnModule;
	onNavigate: () => void;
	progress?: number;
	onEdit?: (learningModule: learnModule) => void;
	onDelete?: (learningModule: learnModule) => void;
	selected?: boolean;
}

const LearnCard: React.FC<props> = (props) => {
	const {
		learningModule,
		onNavigate,
		progress = 0,
		selected = false,
		onEdit = () => {},
		onDelete = () => {},
	} = props;
	const { title } = learningModule;
	let icon = null;

	if (learningModule instanceof Course || learningModule instanceof Chapter) {
		const { iconName, color } = learningModule;
		icon = (
			<Icon
				name={iconName}
				color={color}
				size="med"
				className={classes.icon}
			/>
		);
	}
	const editingHandler = () => {
		onEdit(learningModule);
	};
	const deletingHandler = () => {
		onDelete(learningModule);
	};

	return (
		<EditToolbox
			active={selected}
			onEdit={editingHandler}
			onDelete={deletingHandler}
		>
			<Button
				styling="card"
				onClick={onNavigate}
				className={classes.button}
				selected={selected}
			>
				{icon} {title}
			</Button>
		</EditToolbox>
	);
};

export default LearnCard;
