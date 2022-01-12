import { useParams } from 'react-router-dom';
import EditStudyCard from '../../../components/StudyCards/EditStudyCard/EditStudyCard';
import StudyCard from '../../../components/StudyCards/StudyCard/StudyCard';
import useCardStack from '../../../hooks/useCardStack';
import classes from './ManageCards.module.scss';

const ManageCards: React.FC = (props) => {
	const { lesson_id } = useParams();
	const lessonId = lesson_id ? +lesson_id : undefined;
	const { cards, updateCardsHandler } = useCardStack(lessonId);
	console.log(cards);
	return (
		<>
			<h1>Manage Cards</h1>
			<EditStudyCard lessonId={lessonId} onEdited={updateCardsHandler} />
			<div className={classes['cards-list']}>
				{cards
					.map((card) => {
						return <StudyCard key={card.id} card={card} />;
					})
					.reverse()}
			</div>
		</>
	);
};

export default ManageCards;
