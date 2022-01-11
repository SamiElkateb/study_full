import classes from './LearnModuleSection.module.scss';
import useToggleVisible from '../../../hooks/useToggleVisible';
import Carousel from '../../UI/Carousel/Carousel';
import Button from '../../UserEvents/Button/Button';
import AddLearnModule from '../AddLearnModule/AddLearnModule';
import LearnCard from '../LearnCard/LearnCard';
import { learnModule, learnModuleArray } from '../../../types/learnModules';
import { useState } from 'react';
import { deleteChapter } from '../../../API/chapters';
import { Chapter, Course, Lesson } from '../../../DataStructures/LearnModule';
import { deleteLesson } from '../../../API/lessons';
import { deleteCourse } from '../../../API/courses';

interface props {
	learnModuleType: 'course' | 'chapter' | 'lesson';
	learnModules: learnModuleArray;
	selectedLearnModule: number | undefined;
	selectedParent?: number | undefined;
	onNavigate?: (id: number) => void;
	onEdited?: () => void;
}

const LearnModuleSection: React.FC<props> = (props) => {
	const {
		learnModuleType,
		learnModules,
		selectedLearnModule,
		onNavigate = () => {},
		onEdited = () => {},
		selectedParent,
	} = props;
	const [learnModuleInEdition, setLearnModuleInEdition] =
		useState<learnModule>();

	const isEdit = typeof onEdited !== 'undefined';
	const {
		isVisible: isAddingNewLearnModule,
		toggleIsVisible: toggleAddingNewLearnModule,
	} = useToggleVisible();

	const editedLearnModuleHandler = () => {
		onEdited();
		setLearnModuleInEdition(undefined);
		toggleAddingNewLearnModule(false);
	};

	const deleteLearnModuleHandler = (learnModule: learnModule) => {
		if (learnModule instanceof Course)
			deleteCourse(learnModule.id).then(editedLearnModuleHandler);
		if (learnModule instanceof Chapter)
			deleteChapter(learnModule.id).then(editedLearnModuleHandler);
		if (learnModule instanceof Lesson)
			deleteLesson(learnModule.id).then(editedLearnModuleHandler);
	};

	const editingLearnModuleHandler = (learnModule: learnModule) => {
		toggleAddingNewLearnModule(true);
		setLearnModuleInEdition(learnModule);
	};

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
							onEdit={editingLearnModuleHandler}
							onDelete={deleteLearnModuleHandler}
							onNavigate={navigateHandler.bind(
								null,
								learnModule.id
							)}
						/>
					);
				})}
			</Carousel>

			{isAddingNewLearnModule && (
				<AddLearnModule
					type={learnModuleType}
					onAdded={editedLearnModuleHandler}
					parentId={selectedParent}
					learnModule={learnModuleInEdition}
				/>
			)}
		</div>
	);
};

export default LearnModuleSection;
