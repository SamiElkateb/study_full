import classes from './Dashboard.module.scss';
import { useParams } from 'react-router-dom';
import LeftNav from '../../components/Navbars/LeftNav/LeftNav';
import DashboardSection from './DashboardSection/DashboardSection';
import DailyCards from './DailyCards/DailyCards';
import Learn from './Learn/Learn';
import Stats from './Stats/Stats';
import ManageCards from './ManageCards/ManageCards';

const Dashboard: React.FC = (props) => {
	let { section = 'daily-cards' } = useParams();
	return (
		<main className={classes['study-panel']}>
			<LeftNav />
			<DashboardSection>
				{section === 'daily-cards' && <DailyCards />}
				{section === 'learn' && <Learn />}
				{section === 'stats' && <Stats />}
				{section === 'manage-cards' && <ManageCards />}
			</DashboardSection>
		</main>
	);
};

export default Dashboard;
