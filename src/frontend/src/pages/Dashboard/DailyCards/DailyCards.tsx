import EditStudyCard from '../../../components/StudyCards/EditStudyCard/EditStudyCard';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './DailyCards.module.scss';
import sectionTitlesData from '../../../data/sectionTitlesData.json';

const DailyCards: React.FC = (props) => {
	const { children } = props;
	const { title, description } = sectionTitlesData.dailyCards;
	return (
		<Wrapper>
			<SectionTitle
				title={title}
				description={description}
				iconName="calendar"
			/>
		</Wrapper>
	);
};

export default DailyCards;
