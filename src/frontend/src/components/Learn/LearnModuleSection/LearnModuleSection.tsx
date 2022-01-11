import { Chapter, Course, Lesson } from '../../../DataStructures/LearnModule';
import classes from './LearnModuleSection.module.scss';
import useToggleVisible from '../../../hooks/useToggleVisible';
import Carousel from '../../UI/Carousel/Carousel';
import Button from '../../UserEvents/Button/Button';
import AddLearnModule from '../AddLearnModule/AddLearnModule';
import LearnCard from '../LearnCard/LearnCard';

interface props {
	learnModuleType: 'course' | 'chapter' | 'lesson';
	learnModules: Course[] | Chapter[] | Lesson[];
	selectedLearnModule: number | undefined;
	selectedParent?: number | undefined;
	onNavigate?: (id: number) => void;
	onAdded?: () => void;
}

const LearnModuleSection: React.FC<props> = (props) => {
	const {
		learnModuleType,
		learnModules,
		selectedLearnModule,
		onNavigate = () => {},
		onAdded,
		selectedParent,
	} = props;

	const isEdit = typeof onAdded !== 'undefined';
	let addedLearnModuleHandler = () => {};
	const {
		isVisible: isAddingNewLearnModule,
		toggleIsVisible: toggleAddingNewLearnModule,
	} = useToggleVisible();

	if (isEdit) {
		addedLearnModuleHandler = () => {
			onAdded();
			toggleAddingNewLearnModule(false);
		};
	}

	const navigateHandler = (learnModuleId: number) => {
		toggleAddingNewLearnModule(false);
		onNavigate(learnModuleId);
	};
	return (
		<div className={classes['learn-module']}>
			<h2 className={classes.title}>{learnModuleType}</h2>
			<Carousel length={learnModules.length}>
				{isEdit && (
					<Button
						styling="card"
						onClick={toggleAddingNewLearnModule.bind(null, true)}
						selected={isAddingNewLearnModule}
						className={classes.button}
					>
						Add
					</Button>
				)}
				{learnModules.map((learnModule) => {
					return (
						<LearnCard
							key={learnModule.id}
							learningModule={learnModule}
							selected={selectedLearnModule === learnModule.id}
							onClick={navigateHandler.bind(null, learnModule.id)}
						/>
					);
				})}
			</Carousel>
			{isAddingNewLearnModule && isEdit && (
				<AddLearnModule
					type={learnModuleType}
					onAdded={addedLearnModuleHandler}
					parentId={selectedParent}
				/>
			)}
		</div>
	);
};

export default LearnModuleSection;
