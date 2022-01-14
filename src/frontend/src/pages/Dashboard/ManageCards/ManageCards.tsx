import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCard } from '../../../API/cards';
import EditStudyCard from '../../../components/StudyCards/EditStudyCard/EditStudyCard';
import StudyCard from '../../../components/StudyCards/StudyCard/StudyCard';
import EditToolbox from '../../../components/UserEvents/EditToolbox/EditToolbox';
import StudyCardClass from '../../../DataStructures/StudyCard';
import useAuth from '../../../hooks/useAuth';
import useCardStack from '../../../hooks/useCardStack';
import classes from './ManageCards.module.scss';

const ManageCards: React.FC = (props) => {
	const { authToken } = useAuth();
	const { lesson_id } = useParams();
	const lessonId = lesson_id ? +lesson_id : undefined;
	const { cards, updateCardsHandler } = useCardStack(lessonId);
	const [cardToEdit, setCardToEdit] = useState<StudyCardClass>();

	const deleteCardHandler = (id: number) => {
		const lessonIdToUpdate = lessonId ? lessonId : 0;
		deleteCard(id, authToken).then(
			updateCardsHandler.bind(null, lessonIdToUpdate)
		);
		if (id === cardToEdit?.id) setCardToEdit(undefined);
	};

	const editCardHandler = (card: StudyCardClass) => {
		setCardToEdit(card);
	};

	const editedHandler = (id: number) => {
		updateCardsHandler(id);
		setCardToEdit(undefined);
	};

	return (
		<>
			<h1>Manage Cards</h1>
			<EditStudyCard
				lessonId={lessonId}
				onEdited={editedHandler}
				studyCard={cardToEdit}
			/>

			<div className={classes['cards-list']}>
				{cards
					.map((card) => {
						return (
							<EditToolbox
								key={card.id}
								active={true}
								onDelete={deleteCardHandler.bind(null, card.id)}
								onEdit={editCardHandler.bind(null, card)}
							>
								<StudyCard
									card={card}
									className={classes.card}
								/>
							</EditToolbox>
						);
					})
					.reverse()}
			</div>
		</>
	);
};

export default ManageCards;
