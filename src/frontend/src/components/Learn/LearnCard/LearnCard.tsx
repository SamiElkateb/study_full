import { Course, Chapter, Lesson } from '../../../DataStructures/LearnModule';
import classes from './LearnCard.module.scss';
import Icon from '../../UI/Icons/Icon';
import Button from '../../UserEvents/Button/Button';

interface props {
	learningModule: Course | Chapter | Lesson;
	onClick: () => void;
	progress?: number;
	selected?: boolean;
}

const LearnCard: React.FC<props> = (props) => {
	const { learningModule, onClick, progress = 0, selected = false } = props;
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

	return (
		<Button
			styling="card"
			onClick={onClick}
			className={classes.button}
			selected={selected}
		>
			{icon} {title}
		</Button>
	);
};

export default LearnCard;
