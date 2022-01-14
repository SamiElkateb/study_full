import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCard } from '../../../API/cards';
import EditStudyCard from '../../../components/StudyCards/EditStudyCard/EditStudyCard';
import StudyCard from '../../../components/StudyCards/StudyCard/StudyCard';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import EditToolbox from '../../../components/UserEvents/EditToolbox/EditToolbox';
import StudyCardClass from '../../../DataStructures/StudyCard';
import useAuth from '../../../hooks/useAuth';
import useCardStack from '../../../hooks/useCardStack';
import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './ManageCards.module.scss';
import sectionTitlesData from '../../../data/sectionTitlesData.json';

const ManageCards: React.FC = (props) => {
	const { authToken } = useAuth();
	const { lesson_id } = useParams();
	const lessonId = lesson_id ? +lesson_id : undefined;
	const { cards, updateCardsHandler } = useCardStack(lessonId);
	const [cardToEdit, setCardToEdit] = useState<StudyCardClass>();
	const { title, description } = sectionTitlesData.manageCards;

	const deleteCardHandler = (id: number) => {
		if (!authToken) return;
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
		<Wrapper>
			<SectionTitle
				title={title}
				description={description}
				iconName="edit"
			/>
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
		</Wrapper>
	);
};

export default ManageCards;
