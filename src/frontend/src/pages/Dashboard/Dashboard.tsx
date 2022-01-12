import classes from './Dashboard.module.scss';
import { useParams } from 'react-router-dom';
import LeftNav from '../../components/Navbars/LeftNav/LeftNav';
import DashboardSection from './DashboardSection/DashboardSection';
import DailyCards from './DailyCards/DailyCards';
import Learn from './Learn/Learn';
import Stats from './Stats/Stats';
import Manage from './Manage/Manage';
import ManageCards from './ManageCards/ManageCards';

interface props {
	manageCards?: boolean;
}
const Dashboard: React.FC<props> = (props) => {
	const { manageCards } = props;
	let { section } = useParams();
	section = manageCards ? undefined : section;
	return (
		<main className={classes['study-panel']}>
			<LeftNav />
			<DashboardSection>
				{section === 'daily-cards' && <DailyCards />}
				{section === 'learn' && <Learn />}
				{section === 'stats' && <Stats />}
				{section === 'manage' && <Manage />}
				{manageCards && <ManageCards />}
			</DashboardSection>
		</main>
	);
};

export default Dashboard;
