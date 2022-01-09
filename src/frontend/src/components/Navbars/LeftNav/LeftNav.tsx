import classes from './LeftNav.module.scss';
import { Link } from 'react-router-dom';
import { IoRocket } from 'react-icons/io5';
import { AiFillFileAdd } from 'react-icons/ai';

const LeftNav: React.FC = () => {
	return (
		<nav className={classes['left-nav']}>
			<ul>
				<li className={classes['brand-name']}>
					<Link to="/study">
						<IoRocket /> Learn
					</Link>
				</li>
				<li>
					<Link to="/study">
						<AiFillFileAdd /> Create cards
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default LeftNav;
