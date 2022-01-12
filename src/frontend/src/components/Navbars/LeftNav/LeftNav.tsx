import classes from './LeftNav.module.scss';
import { Link } from 'react-router-dom';
import { BsFileEarmarkDiff } from 'react-icons/bs';
import Icon from '../../UI/Icons/Icon';

const LeftNav: React.FC = () => {
	return (
		<nav className={classes['left-nav']}>
			<ul>
				<li>
					<Link to="/study/learn">
						<Icon name="rocket" />
						Learn
					</Link>
				</li>
				<li>
					<Link to="/study/daily-cards">
						<Icon name="calendar" /> Daily Cards
					</Link>
				</li>
				<li>
					<Link to="/study/manage">
						<BsFileEarmarkDiff /> Manage
					</Link>
				</li>
				<li>
					<Link to="/study/stats">
						<Icon name="trophy" /> Stats
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftNav;
