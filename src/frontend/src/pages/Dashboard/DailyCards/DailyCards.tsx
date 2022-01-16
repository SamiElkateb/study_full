import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import SectionTitle from '../SectionTitle/SectionTitle';
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
