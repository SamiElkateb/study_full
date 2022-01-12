import EditStudyCard from '../../../components/StudyCards/EditStudyCard/EditStudyCard';
import classes from './DailyCards.module.scss';

const DailyCards: React.FC = (props) => {
	const { children } = props;
	return (
		<>
			<h1>DailyCards</h1> <EditStudyCard />
		</>
	);
};

export default DailyCards;
