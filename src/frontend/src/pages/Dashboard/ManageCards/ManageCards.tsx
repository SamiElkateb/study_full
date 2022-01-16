import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteFlashcard } from '../../../API/flashcards';
import EditFlashcard from '../../../components/Flashcards/EditFlashcard/EditFlashcard';
import Flashcard from '../../../components/Flashcards/Flashcard/Flashcard';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import EditToolbox from '../../../components/UserEvents/EditToolbox/EditToolbox';
import FlashcardClass from '../../../DataStructures/Flashcard';
import useAuth from '../../../hooks/useAuth';
import useFlashcardStack from '../../../hooks/useFlashcardStack';
import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './ManageCards.module.scss';
import sectionTitlesData from '../../../data/sectionTitlesData.json';

const ManageCards: React.FC = (props) => {
	const { authToken } = useAuth();
	const { lesson_id } = useParams();
	const lessonId = lesson_id ? +lesson_id : undefined;
	const { cards, updateCardsHandler } = useFlashcardStack(lessonId);
	const [cardToEdit, setCardToEdit] = useState<FlashcardClass>();
	const { title, description } = sectionTitlesData.manageCards;

	const deleteCardHandler = (id: number) => {
		if (!authToken) return;
		const lessonIdToUpdate = lessonId ? lessonId : 0;
		deleteFlashcard(id, authToken).then(
			updateCardsHandler.bind(null, lessonIdToUpdate)
		);
		if (id === cardToEdit?.id) setCardToEdit(undefined);
	};

	const editCardHandler = (card: FlashcardClass) => {
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
			<EditFlashcard
				lessonId={lessonId}
				onEdited={editedHandler}
				flashcard={cardToEdit}
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
								<Flashcard
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
