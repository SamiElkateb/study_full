import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiGraduateCap } from 'react-icons/gi';

const Header: React.FC = () => {
	let authElements = (
		<li className={classes.auth}>
			<ul>
				<li className={classes.login}>
					<Link to="/">Log In</Link>
				</li>
				<li className={classes.signup}>
					<Link to="/">Get Started</Link>
				</li>
			</ul>
		</li>
	);
	return (
		<header className={`${classes.header} ${classes.sticky}`}>
			<nav>
				<ul>
					<li className={classes['brand-name']}>
						<Link to="/">
							<GiGraduateCap /> StudyApp
						</Link>
					</li>
					<li>
						<Link to="/study">Study</Link>
					</li>
					{authElements}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
