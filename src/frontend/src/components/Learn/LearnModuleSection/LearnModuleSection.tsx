import classes from './LearnModuleSection.module.scss';
import useToggleVisible from '../../../hooks/useToggleVisible';
import Carousel from '../../UI/Carousel/Carousel';
import Button from '../../UserEvents/Button/Button';
import EditLearnModule from '../EditLearnModule/EditLearnModule';
import LearnCard from '../LearnCard/LearnCard';
import { learnModule, learnModuleArray } from '../../../types/learnModules';
import { useState } from 'react';
import { deleteLearnModule } from '../../../API/learnModule';
import useAuth from '../../../hooks/useAuth';

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
		onEdited,
		selectedParent,
	} = props;
	const isEdit = typeof onEdited !== 'undefined';
	const { authToken } = useAuth();
	const [learnModuleInEdition, setLearnModuleInEdition] =
		useState<learnModule>();

	const {
		isVisible: isEditingLearnModule,
		toggleIsVisible: toggleEditingLearnModule,
	} = useToggleVisible();

	const editedLearnModuleHandler = isEdit
		? () => {
				onEdited();
				setLearnModuleInEdition(undefined);
				toggleEditingLearnModule(false);
		  }
		: undefined;

	const addingLearnModuleHandler = isEdit
		? () => {
				toggleEditingLearnModule(true);
				setLearnModuleInEdition(undefined);
		  }
		: undefined;

	const deleteLearnModuleHandler = isEdit
		? (learnModule: learnModule) => {
				if (!authToken) return;
				const deleteData = { learnModule, token: authToken };
				deleteLearnModule(deleteData).then(editedLearnModuleHandler);
		  }
		: undefined;

	const editingLearnModuleHandler = isEdit
		? (learnModule: learnModule) => {
				toggleEditingLearnModule(true);
				setLearnModuleInEdition(learnModule);
		  }
		: undefined;

	const navigateHandler = (learnModuleId: number) => {
		toggleEditingLearnModule(false);
		onNavigate(learnModuleId);
	};

	return (
		<div className={classes['learn-module']}>
			<h2 className={classes.title}>{learnModuleType}</h2>
			<Carousel length={learnModules.length}>
				{isEdit && (
					<Button
						styling="card"
						onClick={addingLearnModuleHandler}
						selected={isEditingLearnModule}
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

			{isEditingLearnModule && (
				<EditLearnModule
					learnModuleType={learnModuleType}
					onAdded={editedLearnModuleHandler}
					parentId={selectedParent}
					learnModule={learnModuleInEdition}
				/>
			)}
		</div>
	);
};

export default LearnModuleSection;
