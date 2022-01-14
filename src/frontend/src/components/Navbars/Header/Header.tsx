import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { GiGraduateCap } from 'react-icons/gi';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import Button from '../../UserEvents/Button/Button';

const Header: React.FC = () => {
	const authCtx = useContext(AuthContext);

	let authElements = (
		<li className={classes.auth}>
			<ul>
				<li className={classes.login}>
					<Link to="/login">Log In</Link>
				</li>
				<li className={classes.signup}>
					<Link to="/register">Get Started</Link>
				</li>
			</ul>
		</li>
	);
	if (authCtx.isLoggedIn) {
		authElements = (
			<li className={classes.auth}>
				<Button
					onClick={authCtx.logout}
					styling="error-secondary"
					className={classes.logout}
				>
					Log Out
				</Button>
			</li>
		);
	}
	return (
		<header className={`${classes.header} ${classes.sticky}`}>
			<nav>
				<ul>
					<li className={classes['brand-name']}>
						<Link to="/">
							<GiGraduateCap /> StudyApp
						</Link>
					</li>
					{authElements}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
