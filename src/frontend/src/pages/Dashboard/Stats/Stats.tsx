import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import SectionTitle from '../SectionTitle/SectionTitle';
import sectionTitlesData from '../../../data/sectionTitlesData.json';
import classes from './Stats.module.scss';

const Stats: React.FC = (props) => {
	const { children } = props;
	const { title, description } = sectionTitlesData.stats;
	return (
		<Wrapper>
			<SectionTitle
				title={title}
				description={description}
				iconName="trophy"
			/>
		</Wrapper>
	);
};

export default Stats;
